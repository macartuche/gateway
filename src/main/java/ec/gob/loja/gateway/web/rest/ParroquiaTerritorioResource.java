package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.ParroquiaTerritorioRepository;
import ec.gob.loja.gateway.service.ParroquiaTerritorioService;
import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.ParroquiaTerritorio}.
 */
@RestController
@RequestMapping("/api/parroquia-territorios")
public class ParroquiaTerritorioResource {

    private final Logger log = LoggerFactory.getLogger(ParroquiaTerritorioResource.class);

    private static final String ENTITY_NAME = "parroquiaTerritorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParroquiaTerritorioService parroquiaTerritorioService;

    private final ParroquiaTerritorioRepository parroquiaTerritorioRepository;

    public ParroquiaTerritorioResource(
        ParroquiaTerritorioService parroquiaTerritorioService,
        ParroquiaTerritorioRepository parroquiaTerritorioRepository
    ) {
        this.parroquiaTerritorioService = parroquiaTerritorioService;
        this.parroquiaTerritorioRepository = parroquiaTerritorioRepository;
    }

    /**
     * {@code POST  /parroquia-territorios} : Create a new parroquiaTerritorio.
     *
     * @param parroquiaTerritorioDTO the parroquiaTerritorioDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parroquiaTerritorioDTO, or with status {@code 400 (Bad Request)} if the parroquiaTerritorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<ParroquiaTerritorioDTO>> createParroquiaTerritorio(
        @Valid @RequestBody ParroquiaTerritorioDTO parroquiaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to save ParroquiaTerritorio : {}", parroquiaTerritorioDTO);
        if (parroquiaTerritorioDTO.getId() != null) {
            throw new BadRequestAlertException("A new parroquiaTerritorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return parroquiaTerritorioService
            .save(parroquiaTerritorioDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/parroquia-territorios/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /parroquia-territorios/:id} : Updates an existing parroquiaTerritorio.
     *
     * @param id the id of the parroquiaTerritorioDTO to save.
     * @param parroquiaTerritorioDTO the parroquiaTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parroquiaTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the parroquiaTerritorioDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parroquiaTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<ParroquiaTerritorioDTO>> updateParroquiaTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ParroquiaTerritorioDTO parroquiaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ParroquiaTerritorio : {}, {}", id, parroquiaTerritorioDTO);
        if (parroquiaTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parroquiaTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return parroquiaTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return parroquiaTerritorioService
                    .update(parroquiaTerritorioDTO)
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
     * {@code PATCH  /parroquia-territorios/:id} : Partial updates given fields of an existing parroquiaTerritorio, field will ignore if it is null
     *
     * @param id the id of the parroquiaTerritorioDTO to save.
     * @param parroquiaTerritorioDTO the parroquiaTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parroquiaTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the parroquiaTerritorioDTO is not valid,
     * or with status {@code 404 (Not Found)} if the parroquiaTerritorioDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the parroquiaTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ParroquiaTerritorioDTO>> partialUpdateParroquiaTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ParroquiaTerritorioDTO parroquiaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ParroquiaTerritorio partially : {}, {}", id, parroquiaTerritorioDTO);
        if (parroquiaTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parroquiaTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return parroquiaTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ParroquiaTerritorioDTO> result = parroquiaTerritorioService.partialUpdate(parroquiaTerritorioDTO);

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
     * {@code GET  /parroquia-territorios} : get all the parroquiaTerritorios.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parroquiaTerritorios in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<ParroquiaTerritorioDTO>>> getAllParroquiaTerritorios(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of ParroquiaTerritorios");
        return parroquiaTerritorioService
            .countAll()
            .zipWith(parroquiaTerritorioService.findAll(pageable).collectList())
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
     * {@code GET  /parroquia-territorios/:id} : get the "id" parroquiaTerritorio.
     *
     * @param id the id of the parroquiaTerritorioDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parroquiaTerritorioDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ParroquiaTerritorioDTO>> getParroquiaTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to get ParroquiaTerritorio : {}", id);
        Mono<ParroquiaTerritorioDTO> parroquiaTerritorioDTO = parroquiaTerritorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parroquiaTerritorioDTO);
    }

    /**
     * {@code DELETE  /parroquia-territorios/:id} : delete the "id" parroquiaTerritorio.
     *
     * @param id the id of the parroquiaTerritorioDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteParroquiaTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to delete ParroquiaTerritorio : {}", id);
        return parroquiaTerritorioService
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
