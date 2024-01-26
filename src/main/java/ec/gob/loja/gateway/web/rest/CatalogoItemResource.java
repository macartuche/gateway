package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.CatalogoItemRepository;
import ec.gob.loja.gateway.service.CatalogoItemService;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.CatalogoItem}.
 */
@RestController
@RequestMapping("/api/catalogo-items")
public class CatalogoItemResource {

    private final Logger log = LoggerFactory.getLogger(CatalogoItemResource.class);

    private static final String ENTITY_NAME = "catalogoItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CatalogoItemService catalogoItemService;

    private final CatalogoItemRepository catalogoItemRepository;

    public CatalogoItemResource(CatalogoItemService catalogoItemService, CatalogoItemRepository catalogoItemRepository) {
        this.catalogoItemService = catalogoItemService;
        this.catalogoItemRepository = catalogoItemRepository;
    }

    /**
     * {@code POST  /catalogo-items} : Create a new catalogoItem.
     *
     * @param catalogoItemDTO the catalogoItemDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new catalogoItemDTO, or with status {@code 400 (Bad Request)} if the catalogoItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<CatalogoItemDTO>> createCatalogoItem(@Valid @RequestBody CatalogoItemDTO catalogoItemDTO)
        throws URISyntaxException {
        log.debug("REST request to save CatalogoItem : {}", catalogoItemDTO);
        if (catalogoItemDTO.getId() != null) {
            throw new BadRequestAlertException("A new catalogoItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return catalogoItemService
            .save(catalogoItemDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/catalogo-items/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /catalogo-items/:id} : Updates an existing catalogoItem.
     *
     * @param id the id of the catalogoItemDTO to save.
     * @param catalogoItemDTO the catalogoItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogoItemDTO,
     * or with status {@code 400 (Bad Request)} if the catalogoItemDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the catalogoItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<CatalogoItemDTO>> updateCatalogoItem(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody CatalogoItemDTO catalogoItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to update CatalogoItem : {}, {}", id, catalogoItemDTO);
        if (catalogoItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, catalogoItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return catalogoItemRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return catalogoItemService
                    .update(catalogoItemDTO)
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
     * {@code PATCH  /catalogo-items/:id} : Partial updates given fields of an existing catalogoItem, field will ignore if it is null
     *
     * @param id the id of the catalogoItemDTO to save.
     * @param catalogoItemDTO the catalogoItemDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated catalogoItemDTO,
     * or with status {@code 400 (Bad Request)} if the catalogoItemDTO is not valid,
     * or with status {@code 404 (Not Found)} if the catalogoItemDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the catalogoItemDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<CatalogoItemDTO>> partialUpdateCatalogoItem(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody CatalogoItemDTO catalogoItemDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update CatalogoItem partially : {}, {}", id, catalogoItemDTO);
        if (catalogoItemDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, catalogoItemDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return catalogoItemRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<CatalogoItemDTO> result = catalogoItemService.partialUpdate(catalogoItemDTO);

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
     * {@code GET  /catalogo-items} : get all the catalogoItems.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of catalogoItems in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<CatalogoItemDTO>>> getAllCatalogoItems(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request
    ) {
        log.debug("REST request to get a page of CatalogoItems");
        return catalogoItemService
            .countAll()
            .zipWith(catalogoItemService.findAll(pageable).collectList())
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
     * {@code GET  /catalogo-items/:id} : get the "id" catalogoItem.
     *
     * @param id the id of the catalogoItemDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the catalogoItemDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<CatalogoItemDTO>> getCatalogoItem(@PathVariable("id") Long id) {
        log.debug("REST request to get CatalogoItem : {}", id);
        Mono<CatalogoItemDTO> catalogoItemDTO = catalogoItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(catalogoItemDTO);
    }

    /**
     * {@code DELETE  /catalogo-items/:id} : delete the "id" catalogoItem.
     *
     * @param id the id of the catalogoItemDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteCatalogoItem(@PathVariable("id") Long id) {
        log.debug("REST request to delete CatalogoItem : {}", id);
        return catalogoItemService
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
