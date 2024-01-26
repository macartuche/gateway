package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.EspecialidadRepository;
import ec.gob.loja.gateway.service.EspecialidadService;
import ec.gob.loja.gateway.service.dto.EspecialidadDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.Especialidad}.
 */
@RestController
@RequestMapping("/api/especialidads")
public class EspecialidadResource {

    private final Logger log = LoggerFactory.getLogger(EspecialidadResource.class);

    private static final String ENTITY_NAME = "especialidad";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EspecialidadService especialidadService;

    private final EspecialidadRepository especialidadRepository;

    public EspecialidadResource(EspecialidadService especialidadService, EspecialidadRepository especialidadRepository) {
        this.especialidadService = especialidadService;
        this.especialidadRepository = especialidadRepository;
    }

    /**
     * {@code POST  /especialidads} : Create a new especialidad.
     *
     * @param especialidadDTO the especialidadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new especialidadDTO, or with status {@code 400 (Bad Request)} if the especialidad has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<EspecialidadDTO>> createEspecialidad(@Valid @RequestBody EspecialidadDTO especialidadDTO)
        throws URISyntaxException {
        log.debug("REST request to save Especialidad : {}", especialidadDTO);
        if (especialidadDTO.getId() != null) {
            throw new BadRequestAlertException("A new especialidad cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return especialidadService
            .save(especialidadDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/especialidads/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /especialidads/:id} : Updates an existing especialidad.
     *
     * @param id the id of the especialidadDTO to save.
     * @param especialidadDTO the especialidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated especialidadDTO,
     * or with status {@code 400 (Bad Request)} if the especialidadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the especialidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<EspecialidadDTO>> updateEspecialidad(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody EspecialidadDTO especialidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Especialidad : {}, {}", id, especialidadDTO);
        if (especialidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, especialidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return especialidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return especialidadService
                    .update(especialidadDTO)
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
     * {@code PATCH  /especialidads/:id} : Partial updates given fields of an existing especialidad, field will ignore if it is null
     *
     * @param id the id of the especialidadDTO to save.
     * @param especialidadDTO the especialidadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated especialidadDTO,
     * or with status {@code 400 (Bad Request)} if the especialidadDTO is not valid,
     * or with status {@code 404 (Not Found)} if the especialidadDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the especialidadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<EspecialidadDTO>> partialUpdateEspecialidad(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody EspecialidadDTO especialidadDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Especialidad partially : {}, {}", id, especialidadDTO);
        if (especialidadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, especialidadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return especialidadRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<EspecialidadDTO> result = especialidadService.partialUpdate(especialidadDTO);

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
     * {@code GET  /especialidads} : get all the especialidads.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of especialidads in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<EspecialidadDTO>>> getAllEspecialidads(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of Especialidads");
        return especialidadService
            .countAll()
            .zipWith(especialidadService.findAll(pageable).collectList())
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
     * {@code GET  /especialidads/:id} : get the "id" especialidad.
     *
     * @param id the id of the especialidadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the especialidadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<EspecialidadDTO>> getEspecialidad(@PathVariable("id") Long id) {
        log.debug("REST request to get Especialidad : {}", id);
        Mono<EspecialidadDTO> especialidadDTO = especialidadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(especialidadDTO);
    }

    /**
     * {@code DELETE  /especialidads/:id} : delete the "id" especialidad.
     *
     * @param id the id of the especialidadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteEspecialidad(@PathVariable("id") Long id) {
        log.debug("REST request to delete Especialidad : {}", id);
        return especialidadService
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
