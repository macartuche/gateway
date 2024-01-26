package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.DiscapacidadRepository;
import ec.gob.loja.gateway.service.DiscapacidadService;
import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import ec.gob.loja.gateway.web.rest.errors.BadRequestAlertException;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.util.ForwardedHeaderUtils;
import reactor.core.publisher.Mono;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.reactive.ResponseUtil;

/**
 * REST controller for managing {@link ec.gob.loja.gateway.domain.Discapacidad}.
 */
@RestController
@RequestMapping("/api/discapacidads")
public class DiscapacidadResource {

    private final Logger log = LoggerFactory.getLogger(DiscapacidadResource.class);

    private static final String ENTITY_NAME = "discapacidad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DiscapacidadService discapacidadService;

    private final DiscapacidadRepository discapacidadRepository;

    public DiscapacidadResource(DiscapacidadService discapacidadService, DiscapacidadRepository discapacidadRepository) {
        this.discapacidadService = discapacidadService;
        this.discapacidadRepository = discapacidadRepository;
    }

    /**
     * {@code POST  /discapacidads} : Create a new discapacidad.
     *
     * @param discapacidadDTO the discapacidadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new discapacidadDTO, or with status {@code 400 (Bad Request)} if the discapacidad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<DiscapacidadDTO>> createDiscapacidad(@Valid @RequestBody DiscapacidadDTO discapacidadDTO)
        throws URISyntaxException {
        log.debug("REST request to save Discapacidad : {}", discapacidadDTO);
        if (discapacidadDTO.getId() != null) {
            throw new BadRequestAlertException("A new discapacidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return discapacidadService
            .save(discapacidadDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/discapacidads/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /discapacidads/:id} : Updates an existing discapacidad.
     *
     * @param id the id of the discapacidadDTO to save.
     * @param discapacidadDTO the discapacidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated discapacidadDTO,
     * or with status {@code 400 (Bad Request)} if the discapacidadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the discapacidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<DiscapacidadDTO>> updateDiscapacidad(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody DiscapacidadDTO discapacidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Discapacidad : {}, {}", id, discapacidadDTO);
        if (discapacidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, discapacidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return discapacidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return discapacidadService
                    .update(discapacidadDTO)
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(result ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                            .body(result)
                    );
            });
    }

    /**
     * {@code PATCH  /discapacidads/:id} : Partial updates given fields of an existing discapacidad, field will ignore if it is null
     *
     * @param id the id of the discapacidadDTO to save.
     * @param discapacidadDTO the discapacidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated discapacidadDTO,
     * or with status {@code 400 (Bad Request)} if the discapacidadDTO is not valid,
     * or with status {@code 404 (Not Found)} if the discapacidadDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the discapacidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<DiscapacidadDTO>> partialUpdateDiscapacidad(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody DiscapacidadDTO discapacidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Discapacidad partially : {}, {}", id, discapacidadDTO);
        if (discapacidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, discapacidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return discapacidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<DiscapacidadDTO> result = discapacidadService.partialUpdate(discapacidadDTO);

                return result
                    .switchIfEmpty(Mono.error(new ResponseStatusException(HttpStatus.NOT_FOUND)))
                    .map(res ->
                        ResponseEntity
                            .ok()
                            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, res.getId().toString()))
                            .body(res)
                    );
            });
    }

    /**
     * {@code GET  /discapacidads} : get all the discapacidads.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of discapacidads in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<DiscapacidadDTO>>> getAllDiscapacidads(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Discapacidads");
        return discapacidadService
            .countAll()
            .zipWith(discapacidadService.findAll(pageable).collectList())
            .map(countWithEntities ->
                ResponseEntity
                    .ok()
                    .headers(
                        PaginationUtil.generatePaginationHttpHeaders(
                            ForwardedHeaderUtils.adaptFromForwardedHeaders(request.getURI(), request.getHeaders()),
                            new PageImpl<>(countWithEntities.getT2(), pageable, countWithEntities.getT1())
                        )
                    )
                    .body(countWithEntities.getT2())
            );
    }

    /**
     * {@code GET  /discapacidads/:id} : get the "id" discapacidad.
     *
     * @param id the id of the discapacidadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the discapacidadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<DiscapacidadDTO>> getDiscapacidad(@PathVariable("id") Long id) {
        log.debug("REST request to get Discapacidad : {}", id);
        Mono<DiscapacidadDTO> discapacidadDTO = discapacidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(discapacidadDTO);
    }

    /**
     * {@code DELETE  /discapacidads/:id} : delete the "id" discapacidad.
     *
     * @param id the id of the discapacidadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteDiscapacidad(@PathVariable("id") Long id) {
        log.debug("REST request to delete Discapacidad : {}", id);
        return discapacidadService
            .delete(id)
            .then(
                Mono.just(
                    ResponseEntity
                        .noContent()
                        .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
                        .build()
                )
            );
    }
}
