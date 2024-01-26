package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.ParametroSistemaRepository;
import ec.gob.loja.gateway.service.ParametroSistemaService;
import ec.gob.loja.gateway.service.dto.ParametroSistemaDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.ParametroSistema}.
 */
@RestController
@RequestMapping("/api/parametro-sistemas")
public class ParametroSistemaResource {

    private final Logger log = LoggerFactory.getLogger(ParametroSistemaResource.class);

    private static final String ENTITY_NAME = "parametroSistema";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ParametroSistemaService parametroSistemaService;

    private final ParametroSistemaRepository parametroSistemaRepository;

    public ParametroSistemaResource(
        ParametroSistemaService parametroSistemaService,
        ParametroSistemaRepository parametroSistemaRepository
    ) {
        this.parametroSistemaService = parametroSistemaService;
        this.parametroSistemaRepository = parametroSistemaRepository;
    }

    /**
     * {@code POST  /parametro-sistemas} : Create a new parametroSistema.
     *
     * @param parametroSistemaDTO the parametroSistemaDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new parametroSistemaDTO, or with status {@code 400 (Bad Request)} if the parametroSistema has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<ParametroSistemaDTO>> createParametroSistema(@Valid @RequestBody ParametroSistemaDTO parametroSistemaDTO)
        throws URISyntaxException {
        log.debug("REST request to save ParametroSistema : {}", parametroSistemaDTO);
        if (parametroSistemaDTO.getId() != null) {
            throw new BadRequestAlertException("A new parametroSistema cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return parametroSistemaService
            .save(parametroSistemaDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/parametro-sistemas/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /parametro-sistemas/:id} : Updates an existing parametroSistema.
     *
     * @param id the id of the parametroSistemaDTO to save.
     * @param parametroSistemaDTO the parametroSistemaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametroSistemaDTO,
     * or with status {@code 400 (Bad Request)} if the parametroSistemaDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the parametroSistemaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<ParametroSistemaDTO>> updateParametroSistema(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ParametroSistemaDTO parametroSistemaDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ParametroSistema : {}, {}", id, parametroSistemaDTO);
        if (parametroSistemaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametroSistemaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return parametroSistemaRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return parametroSistemaService
                    .update(parametroSistemaDTO)
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
     * {@code PATCH  /parametro-sistemas/:id} : Partial updates given fields of an existing parametroSistema, field will ignore if it is null
     *
     * @param id the id of the parametroSistemaDTO to save.
     * @param parametroSistemaDTO the parametroSistemaDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated parametroSistemaDTO,
     * or with status {@code 400 (Bad Request)} if the parametroSistemaDTO is not valid,
     * or with status {@code 404 (Not Found)} if the parametroSistemaDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the parametroSistemaDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ParametroSistemaDTO>> partialUpdateParametroSistema(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ParametroSistemaDTO parametroSistemaDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ParametroSistema partially : {}, {}", id, parametroSistemaDTO);
        if (parametroSistemaDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, parametroSistemaDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return parametroSistemaRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ParametroSistemaDTO> result = parametroSistemaService.partialUpdate(parametroSistemaDTO);

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
     * {@code GET  /parametro-sistemas} : get all the parametroSistemas.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of parametroSistemas in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<ParametroSistemaDTO>>> getAllParametroSistemas(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of ParametroSistemas");
        return parametroSistemaService
            .countAll()
            .zipWith(parametroSistemaService.findAll(pageable).collectList())
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
     * {@code GET  /parametro-sistemas/:id} : get the "id" parametroSistema.
     *
     * @param id the id of the parametroSistemaDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the parametroSistemaDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ParametroSistemaDTO>> getParametroSistema(@PathVariable("id") Long id) {
        log.debug("REST request to get ParametroSistema : {}", id);
        Mono<ParametroSistemaDTO> parametroSistemaDTO = parametroSistemaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(parametroSistemaDTO);
    }

    /**
     * {@code DELETE  /parametro-sistemas/:id} : delete the "id" parametroSistema.
     *
     * @param id the id of the parametroSistemaDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteParametroSistema(@PathVariable("id") Long id) {
        log.debug("REST request to delete ParametroSistema : {}", id);
        return parametroSistemaService
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
