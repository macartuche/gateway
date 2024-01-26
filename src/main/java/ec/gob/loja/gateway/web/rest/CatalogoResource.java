package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.CatalogoRepository;
import ec.gob.loja.gateway.service.CatalogoService;
import ec.gob.loja.gateway.service.dto.CatalogoDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.Catalogo}.
 */
@RestController
@RequestMapping("/api/catalogos")
public class CatalogoResource {

    private final Logger log = LoggerFactory.getLogger(CatalogoResource.class);

    private static final String ENTITY_NAME = "catalogo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CatalogoService catalogoService;

    private final CatalogoRepository catalogoRepository;

    public CatalogoResource(CatalogoService catalogoService, CatalogoRepository catalogoRepository) {
        this.catalogoService = catalogoService;
        this.catalogoRepository = catalogoRepository;
    }

    /**
     * {@code POST  /catalogos} : Create a new catalogo.
     *
     * @param catalogoDTO the catalogoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new catalogoDTO, or with status {@code 400 (Bad Request)} if the catalogo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<CatalogoDTO>> createCatalogo(@Valid @RequestBody CatalogoDTO catalogoDTO) throws URISyntaxException {
        log.debug("REST request to save Catalogo : {}", catalogoDTO);
        if (catalogoDTO.getId() != null) {
            throw new BadRequestAlertException("A new catalogo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return catalogoService
            .save(catalogoDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/catalogos/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /catalogos/:id} : Updates an existing catalogo.
     *
     * @param id the id of the catalogoDTO to save.
     * @param catalogoDTO the catalogoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogoDTO,
     * or with status {@code 400 (Bad Request)} if the catalogoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the catalogoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<CatalogoDTO>> updateCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CatalogoDTO catalogoDTO
    ) throws URISyntaxException {
        log.debug("REST request to update Catalogo : {}, {}", id, catalogoDTO);
        if (catalogoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, catalogoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return catalogoRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return catalogoService
                    .update(catalogoDTO)
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
     * {@code PATCH  /catalogos/:id} : Partial updates given fields of an existing catalogo, field will ignore if it is null
     *
     * @param id the id of the catalogoDTO to save.
     * @param catalogoDTO the catalogoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogoDTO,
     * or with status {@code 400 (Bad Request)} if the catalogoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the catalogoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the catalogoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<CatalogoDTO>> partialUpdateCatalogo(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CatalogoDTO catalogoDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update Catalogo partially : {}, {}", id, catalogoDTO);
        if (catalogoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, catalogoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return catalogoRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<CatalogoDTO> result = catalogoService.partialUpdate(catalogoDTO);

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
     * {@code GET  /catalogos} : get all the catalogos.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of catalogos in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<CatalogoDTO>>> getAllCatalogos(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of Catalogos");
        return catalogoService
            .countAll()
            .zipWith(catalogoService.findAll(pageable).collectList())
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
     * {@code GET  /catalogos/:id} : get the "id" catalogo.
     *
     * @param id the id of the catalogoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the catalogoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<CatalogoDTO>> getCatalogo(@PathVariable("id") Long id) {
        log.debug("REST request to get Catalogo : {}", id);
        Mono<CatalogoDTO> catalogoDTO = catalogoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(catalogoDTO);
    }

    /**
     * {@code DELETE  /catalogos/:id} : delete the "id" catalogo.
     *
     * @param id the id of the catalogoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteCatalogo(@PathVariable("id") Long id) {
        log.debug("REST request to delete Catalogo : {}", id);
        return catalogoService
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
