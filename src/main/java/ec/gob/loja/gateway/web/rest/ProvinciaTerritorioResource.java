package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.ProvinciaTerritorioRepository;
import ec.gob.loja.gateway.service.ProvinciaTerritorioService;
import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.ProvinciaTerritorio}.
 */
@RestController
@RequestMapping("/api/provincia-territorios")
public class ProvinciaTerritorioResource {

    private final Logger log = LoggerFactory.getLogger(ProvinciaTerritorioResource.class);

    private static final String ENTITY_NAME = "provinciaTerritorio";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProvinciaTerritorioService provinciaTerritorioService;

    private final ProvinciaTerritorioRepository provinciaTerritorioRepository;

    public ProvinciaTerritorioResource(
        ProvinciaTerritorioService provinciaTerritorioService,
        ProvinciaTerritorioRepository provinciaTerritorioRepository
    ) {
        this.provinciaTerritorioService = provinciaTerritorioService;
        this.provinciaTerritorioRepository = provinciaTerritorioRepository;
    }

    /**
     * {@code POST  /provincia-territorios} : Create a new provinciaTerritorio.
     *
     * @param provinciaTerritorioDTO the provinciaTerritorioDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new provinciaTerritorioDTO, or with status {@code 400 (Bad Request)} if the provinciaTerritorio has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<ProvinciaTerritorioDTO>> createProvinciaTerritorio(
        @Valid @RequestBody ProvinciaTerritorioDTO provinciaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to save ProvinciaTerritorio : {}", provinciaTerritorioDTO);
        if (provinciaTerritorioDTO.getId() != null) {
            throw new BadRequestAlertException("A new provinciaTerritorio cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return provinciaTerritorioService
            .save(provinciaTerritorioDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/provincia-territorios/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /provincia-territorios/:id} : Updates an existing provinciaTerritorio.
     *
     * @param id the id of the provinciaTerritorioDTO to save.
     * @param provinciaTerritorioDTO the provinciaTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provinciaTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the provinciaTerritorioDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the provinciaTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<ProvinciaTerritorioDTO>> updateProvinciaTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ProvinciaTerritorioDTO provinciaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ProvinciaTerritorio : {}, {}", id, provinciaTerritorioDTO);
        if (provinciaTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, provinciaTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return provinciaTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return provinciaTerritorioService
                    .update(provinciaTerritorioDTO)
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
     * {@code PATCH  /provincia-territorios/:id} : Partial updates given fields of an existing provinciaTerritorio, field will ignore if it is null
     *
     * @param id the id of the provinciaTerritorioDTO to save.
     * @param provinciaTerritorioDTO the provinciaTerritorioDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated provinciaTerritorioDTO,
     * or with status {@code 400 (Bad Request)} if the provinciaTerritorioDTO is not valid,
     * or with status {@code 404 (Not Found)} if the provinciaTerritorioDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the provinciaTerritorioDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ProvinciaTerritorioDTO>> partialUpdateProvinciaTerritorio(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ProvinciaTerritorioDTO provinciaTerritorioDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ProvinciaTerritorio partially : {}, {}", id, provinciaTerritorioDTO);
        if (provinciaTerritorioDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, provinciaTerritorioDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return provinciaTerritorioRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ProvinciaTerritorioDTO> result = provinciaTerritorioService.partialUpdate(provinciaTerritorioDTO);

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
     * {@code GET  /provincia-territorios} : get all the provinciaTerritorios.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of provinciaTerritorios in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<ProvinciaTerritorioDTO>>> getAllProvinciaTerritorios(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of ProvinciaTerritorios");
        return provinciaTerritorioService
            .countAll()
            .zipWith(provinciaTerritorioService.findAll(pageable).collectList())
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
     * {@code GET  /provincia-territorios/:id} : get the "id" provinciaTerritorio.
     *
     * @param id the id of the provinciaTerritorioDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the provinciaTerritorioDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ProvinciaTerritorioDTO>> getProvinciaTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to get ProvinciaTerritorio : {}", id);
        Mono<ProvinciaTerritorioDTO> provinciaTerritorioDTO = provinciaTerritorioService.findOne(id);
        return ResponseUtil.wrapOrNotFound(provinciaTerritorioDTO);
    }

    /**
     * {@code DELETE  /provincia-territorios/:id} : delete the "id" provinciaTerritorio.
     *
     * @param id the id of the provinciaTerritorioDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteProvinciaTerritorio(@PathVariable("id") Long id) {
        log.debug("REST request to delete ProvinciaTerritorio : {}", id);
        return provinciaTerritorioService
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
