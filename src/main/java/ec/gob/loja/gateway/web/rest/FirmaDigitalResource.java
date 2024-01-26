package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.FirmaDigitalRepository;
import ec.gob.loja.gateway.service.FirmaDigitalService;
import ec.gob.loja.gateway.service.dto.FirmaDigitalDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.FirmaDigital}.
 */
@RestController
@RequestMapping("/api/firma-digitals")
public class FirmaDigitalResource {

    private final Logger log = LoggerFactory.getLogger(FirmaDigitalResource.class);

    private static final String ENTITY_NAME = "firmaDigital";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FirmaDigitalService firmaDigitalService;

    private final FirmaDigitalRepository firmaDigitalRepository;

    public FirmaDigitalResource(FirmaDigitalService firmaDigitalService, FirmaDigitalRepository firmaDigitalRepository) {
        this.firmaDigitalService = firmaDigitalService;
        this.firmaDigitalRepository = firmaDigitalRepository;
    }

    /**
     * {@code POST  /firma-digitals} : Create a new firmaDigital.
     *
     * @param firmaDigitalDTO the firmaDigitalDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new firmaDigitalDTO, or with status {@code 400 (Bad Request)} if the firmaDigital has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<FirmaDigitalDTO>> createFirmaDigital(@Valid @RequestBody FirmaDigitalDTO firmaDigitalDTO)
        throws URISyntaxException {
        log.debug("REST request to save FirmaDigital : {}", firmaDigitalDTO);
        if (firmaDigitalDTO.getId() != null) {
            throw new BadRequestAlertException("A new firmaDigital cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return firmaDigitalService
            .save(firmaDigitalDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/firma-digitals/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /firma-digitals/:id} : Updates an existing firmaDigital.
     *
     * @param id the id of the firmaDigitalDTO to save.
     * @param firmaDigitalDTO the firmaDigitalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated firmaDigitalDTO,
     * or with status {@code 400 (Bad Request)} if the firmaDigitalDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the firmaDigitalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<FirmaDigitalDTO>> updateFirmaDigital(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody FirmaDigitalDTO firmaDigitalDTO
    ) throws URISyntaxException {
        log.debug("REST request to update FirmaDigital : {}, {}", id, firmaDigitalDTO);
        if (firmaDigitalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, firmaDigitalDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return firmaDigitalRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return firmaDigitalService
                    .update(firmaDigitalDTO)
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
     * {@code PATCH  /firma-digitals/:id} : Partial updates given fields of an existing firmaDigital, field will ignore if it is null
     *
     * @param id the id of the firmaDigitalDTO to save.
     * @param firmaDigitalDTO the firmaDigitalDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated firmaDigitalDTO,
     * or with status {@code 400 (Bad Request)} if the firmaDigitalDTO is not valid,
     * or with status {@code 404 (Not Found)} if the firmaDigitalDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the firmaDigitalDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<FirmaDigitalDTO>> partialUpdateFirmaDigital(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody FirmaDigitalDTO firmaDigitalDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update FirmaDigital partially : {}, {}", id, firmaDigitalDTO);
        if (firmaDigitalDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, firmaDigitalDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return firmaDigitalRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<FirmaDigitalDTO> result = firmaDigitalService.partialUpdate(firmaDigitalDTO);

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
     * {@code GET  /firma-digitals} : get all the firmaDigitals.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of firmaDigitals in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<FirmaDigitalDTO>>> getAllFirmaDigitals(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of FirmaDigitals");
        return firmaDigitalService
            .countAll()
            .zipWith(firmaDigitalService.findAll(pageable).collectList())
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
     * {@code GET  /firma-digitals/:id} : get the "id" firmaDigital.
     *
     * @param id the id of the firmaDigitalDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the firmaDigitalDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<FirmaDigitalDTO>> getFirmaDigital(@PathVariable("id") Long id) {
        log.debug("REST request to get FirmaDigital : {}", id);
        Mono<FirmaDigitalDTO> firmaDigitalDTO = firmaDigitalService.findOne(id);
        return ResponseUtil.wrapOrNotFound(firmaDigitalDTO);
    }

    /**
     * {@code DELETE  /firma-digitals/:id} : delete the "id" firmaDigital.
     *
     * @param id the id of the firmaDigitalDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteFirmaDigital(@PathVariable("id") Long id) {
        log.debug("REST request to delete FirmaDigital : {}", id);
        return firmaDigitalService
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
