package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.RolFuncionalidadRepository;
import ec.gob.loja.gateway.service.RolFuncionalidadService;
import ec.gob.loja.gateway.service.dto.RolFuncionalidadDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.RolFuncionalidad}.
 */
@RestController
@RequestMapping("/api/rol-funcionalidads")
public class RolFuncionalidadResource {

    private final Logger log = LoggerFactory.getLogger(RolFuncionalidadResource.class);

    private static final String ENTITY_NAME = "rolFuncionalidad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RolFuncionalidadService rolFuncionalidadService;

    private final RolFuncionalidadRepository rolFuncionalidadRepository;

    public RolFuncionalidadResource(
        RolFuncionalidadService rolFuncionalidadService,
        RolFuncionalidadRepository rolFuncionalidadRepository
    ) {
        this.rolFuncionalidadService = rolFuncionalidadService;
        this.rolFuncionalidadRepository = rolFuncionalidadRepository;
    }

    /**
     * {@code POST  /rol-funcionalidads} : Create a new rolFuncionalidad.
     *
     * @param rolFuncionalidadDTO the rolFuncionalidadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new rolFuncionalidadDTO, or with status {@code 400 (Bad Request)} if the rolFuncionalidad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<RolFuncionalidadDTO>> createRolFuncionalidad(@Valid @RequestBody RolFuncionalidadDTO rolFuncionalidadDTO)
        throws URISyntaxException {
        log.debug("REST request to save RolFuncionalidad : {}", rolFuncionalidadDTO);
        if (rolFuncionalidadDTO.getId() != null) {
            throw new BadRequestAlertException("A new rolFuncionalidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return rolFuncionalidadService
            .save(rolFuncionalidadDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/rol-funcionalidads/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /rol-funcionalidads/:id} : Updates an existing rolFuncionalidad.
     *
     * @param id the id of the rolFuncionalidadDTO to save.
     * @param rolFuncionalidadDTO the rolFuncionalidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolFuncionalidadDTO,
     * or with status {@code 400 (Bad Request)} if the rolFuncionalidadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the rolFuncionalidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<RolFuncionalidadDTO>> updateRolFuncionalidad(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody RolFuncionalidadDTO rolFuncionalidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to update RolFuncionalidad : {}, {}", id, rolFuncionalidadDTO);
        if (rolFuncionalidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolFuncionalidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return rolFuncionalidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return rolFuncionalidadService
                    .update(rolFuncionalidadDTO)
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
     * {@code PATCH  /rol-funcionalidads/:id} : Partial updates given fields of an existing rolFuncionalidad, field will ignore if it is null
     *
     * @param id the id of the rolFuncionalidadDTO to save.
     * @param rolFuncionalidadDTO the rolFuncionalidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated rolFuncionalidadDTO,
     * or with status {@code 400 (Bad Request)} if the rolFuncionalidadDTO is not valid,
     * or with status {@code 404 (Not Found)} if the rolFuncionalidadDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the rolFuncionalidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<RolFuncionalidadDTO>> partialUpdateRolFuncionalidad(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody RolFuncionalidadDTO rolFuncionalidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update RolFuncionalidad partially : {}, {}", id, rolFuncionalidadDTO);
        if (rolFuncionalidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, rolFuncionalidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return rolFuncionalidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<RolFuncionalidadDTO> result = rolFuncionalidadService.partialUpdate(rolFuncionalidadDTO);

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
     * {@code GET  /rol-funcionalidads} : get all the rolFuncionalidads.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of rolFuncionalidads in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<RolFuncionalidadDTO>>> getAllRolFuncionalidads(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of RolFuncionalidads");
        return rolFuncionalidadService
            .countAll()
            .zipWith(rolFuncionalidadService.findAll(pageable).collectList())
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
     * {@code GET  /rol-funcionalidads/:id} : get the "id" rolFuncionalidad.
     *
     * @param id the id of the rolFuncionalidadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the rolFuncionalidadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<RolFuncionalidadDTO>> getRolFuncionalidad(@PathVariable("id") Long id) {
        log.debug("REST request to get RolFuncionalidad : {}", id);
        Mono<RolFuncionalidadDTO> rolFuncionalidadDTO = rolFuncionalidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(rolFuncionalidadDTO);
    }

    /**
     * {@code DELETE  /rol-funcionalidads/:id} : delete the "id" rolFuncionalidad.
     *
     * @param id the id of the rolFuncionalidadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteRolFuncionalidad(@PathVariable("id") Long id) {
        log.debug("REST request to delete RolFuncionalidad : {}", id);
        return rolFuncionalidadService
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
