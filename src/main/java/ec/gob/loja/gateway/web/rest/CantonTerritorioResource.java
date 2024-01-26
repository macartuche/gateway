package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.CantonTerritorioRepository;
import ec.gob.loja.gateway.service.CantonTerritorioService;
import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.CantonTerritorio}.
 */
@RestController
@RequestMapping("/api/canton-territorios")
public class CantonTerritorioResource {

    private final Logger log = LoggerFactory.getLogger(CantonTerritorioResource.class);

    private static final String ENTITY_NAME = "cantonTerritorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CantonTerritorioService cantonTerritorioService;

    private final CantonTerritorioRepository cantonTerritorioRepository;

    public CantonTerritorioResource(
        CantonTerritorioService cantonTerritorioService,
        CantonTerritorioRepository cantonTerritorioRepository
    ) {
        this.cantonTerritorioService = cantonTerritorioService;
        this.cantonTerritorioRepository = cantonTerritorioRepository;
    }

    /**
     * {@code POST  /canton-territorios} : Create a new cantonTerritorio.
     *
     * @param cantonTerritorioDTO the cantonTerritorioDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new cantonTerritorioDTO, or with status {@code 400 (Bad Request)} if the cantonTerritorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<CantonTerritorioDTO>> createCantonTerritorio(@Valid @RequestBody CantonTerritorioDTO cantonTerritorioDTO)
        throws URISyntaxException {
        log.debug("REST request to save CantonTerritorio : {}", cantonTerritorioDTO);
        if (cantonTerritorioDTO.getId() != null) {
            throw new BadRequestAlertException("A new cantonTerritorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return cantonTerritorioService
            .save(cantonTerritorioDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/canton-territorios/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /canton-territorios/:id} : Updates an existing cantonTerritorio.
     *
     * @param id the id of the cantonTerritorioDTO to save.
     * @param cantonTerritorioDTO the cantonTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantonTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the cantonTerritorioDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the cantonTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<CantonTerritorioDTO>> updateCantonTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CantonTerritorioDTO cantonTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CantonTerritorio : {}, {}", id, cantonTerritorioDTO);
        if (cantonTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantonTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return cantonTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return cantonTerritorioService
                    .update(cantonTerritorioDTO)
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
     * {@code PATCH  /canton-territorios/:id} : Partial updates given fields of an existing cantonTerritorio, field will ignore if it is null
     *
     * @param id the id of the cantonTerritorioDTO to save.
     * @param cantonTerritorioDTO the cantonTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated cantonTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the cantonTerritorioDTO is not valid,
     * or with status {@code 404 (Not Found)} if the cantonTerritorioDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the cantonTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<CantonTerritorioDTO>> partialUpdateCantonTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CantonTerritorioDTO cantonTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CantonTerritorio partially : {}, {}", id, cantonTerritorioDTO);
        if (cantonTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, cantonTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return cantonTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<CantonTerritorioDTO> result = cantonTerritorioService.partialUpdate(cantonTerritorioDTO);

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
     * {@code GET  /canton-territorios} : get all the cantonTerritorios.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cantonTerritorios in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<CantonTerritorioDTO>>> getAllCantonTerritorios(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of CantonTerritorios");
        return cantonTerritorioService
            .countAll()
            .zipWith(cantonTerritorioService.findAll(pageable).collectList())
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
     * {@code GET  /canton-territorios/:id} : get the "id" cantonTerritorio.
     *
     * @param id the id of the cantonTerritorioDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the cantonTerritorioDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<CantonTerritorioDTO>> getCantonTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to get CantonTerritorio : {}", id);
        Mono<CantonTerritorioDTO> cantonTerritorioDTO = cantonTerritorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(cantonTerritorioDTO);
    }

    /**
     * {@code DELETE  /canton-territorios/:id} : delete the "id" cantonTerritorio.
     *
     * @param id the id of the cantonTerritorioDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteCantonTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to delete CantonTerritorio : {}", id);
        return cantonTerritorioService
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
