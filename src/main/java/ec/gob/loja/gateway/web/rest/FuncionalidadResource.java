package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.FuncionalidadRepository;
import ec.gob.loja.gateway.service.FuncionalidadService;
import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.Funcionalidad}.
 */
@RestController
@RequestMapping("/api/funcionalidads")
public class FuncionalidadResource {

    private final Logger log = LoggerFactory.getLogger(FuncionalidadResource.class);

    private static final String ENTITY_NAME = "funcionalidad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FuncionalidadService funcionalidadService;

    private final FuncionalidadRepository funcionalidadRepository;

    public FuncionalidadResource(FuncionalidadService funcionalidadService, FuncionalidadRepository funcionalidadRepository) {
        this.funcionalidadService = funcionalidadService;
        this.funcionalidadRepository = funcionalidadRepository;
    }

    /**
     * {@code POST  /funcionalidads} : Create a new funcionalidad.
     *
     * @param funcionalidadDTO the funcionalidadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new funcionalidadDTO, or with status {@code 400 (Bad Request)} if the funcionalidad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<FuncionalidadDTO>> createFuncionalidad(@Valid @RequestBody FuncionalidadDTO funcionalidadDTO)
        throws URISyntaxException {
        log.debug("REST request to save Funcionalidad : {}", funcionalidadDTO);
        if (funcionalidadDTO.getId() != null) {
            throw new BadRequestAlertException("A new funcionalidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return funcionalidadService
            .save(funcionalidadDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/funcionalidads/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /funcionalidads/:id} : Updates an existing funcionalidad.
     *
     * @param id the id of the funcionalidadDTO to save.
     * @param funcionalidadDTO the funcionalidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funcionalidadDTO,
     * or with status {@code 400 (Bad Request)} if the funcionalidadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the funcionalidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<FuncionalidadDTO>> updateFuncionalidad(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FuncionalidadDTO funcionalidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Funcionalidad : {}, {}", id, funcionalidadDTO);
        if (funcionalidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, funcionalidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return funcionalidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return funcionalidadService
                    .update(funcionalidadDTO)
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
     * {@code PATCH  /funcionalidads/:id} : Partial updates given fields of an existing funcionalidad, field will ignore if it is null
     *
     * @param id the id of the funcionalidadDTO to save.
     * @param funcionalidadDTO the funcionalidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated funcionalidadDTO,
     * or with status {@code 400 (Bad Request)} if the funcionalidadDTO is not valid,
     * or with status {@code 404 (Not Found)} if the funcionalidadDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the funcionalidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<FuncionalidadDTO>> partialUpdateFuncionalidad(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FuncionalidadDTO funcionalidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Funcionalidad partially : {}, {}", id, funcionalidadDTO);
        if (funcionalidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, funcionalidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return funcionalidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<FuncionalidadDTO> result = funcionalidadService.partialUpdate(funcionalidadDTO);

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
     * {@code GET  /funcionalidads} : get all the funcionalidads.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of funcionalidads in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<FuncionalidadDTO>>> getAllFuncionalidads(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Funcionalidads");
        return funcionalidadService
            .countAll()
            .zipWith(funcionalidadService.findAll(pageable).collectList())
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
     * {@code GET  /funcionalidads/:id} : get the "id" funcionalidad.
     *
     * @param id the id of the funcionalidadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the funcionalidadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<FuncionalidadDTO>> getFuncionalidad(@PathVariable("id") Long id) {
        log.debug("REST request to get Funcionalidad : {}", id);
        Mono<FuncionalidadDTO> funcionalidadDTO = funcionalidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(funcionalidadDTO);
    }

    /**
     * {@code DELETE  /funcionalidads/:id} : delete the "id" funcionalidad.
     *
     * @param id the id of the funcionalidadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteFuncionalidad(@PathVariable("id") Long id) {
        log.debug("REST request to delete Funcionalidad : {}", id);
        return funcionalidadService
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
