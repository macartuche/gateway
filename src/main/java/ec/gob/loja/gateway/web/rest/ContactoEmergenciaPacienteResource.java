package ec.gob.loja.gateway.web.rest;

import ec.gob.loja.gateway.repository.ContactoEmergenciaPacienteRepository;
import ec.gob.loja.gateway.service.ContactoEmergenciaPacienteService;
import ec.gob.loja.gateway.service.dto.ContactoEmergenciaPacienteDTO;
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
 * REST controller for managing {@link ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente}.
 */
@RestController
@RequestMapping("/api/contacto-emergencia-pacientes")
public class ContactoEmergenciaPacienteResource {

    private final Logger log = LoggerFactory.getLogger(ContactoEmergenciaPacienteResource.class);

    private static final String ENTITY_NAME = "contactoEmergenciaPaciente";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ContactoEmergenciaPacienteService contactoEmergenciaPacienteService;

    private final ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepository;

    public ContactoEmergenciaPacienteResource(
        ContactoEmergenciaPacienteService contactoEmergenciaPacienteService,
        ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepository
    ) {
        this.contactoEmergenciaPacienteService = contactoEmergenciaPacienteService;
        this.contactoEmergenciaPacienteRepository = contactoEmergenciaPacienteRepository;
    }

    /**
     * {@code POST  /contacto-emergencia-pacientes} : Create a new contactoEmergenciaPaciente.
     *
     * @param contactoEmergenciaPacienteDTO the contactoEmergenciaPacienteDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contactoEmergenciaPacienteDTO, or with status {@code 400 (Bad Request)} if the contactoEmergenciaPaciente has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public Mono<ResponseEntity<ContactoEmergenciaPacienteDTO>> createContactoEmergenciaPaciente(
        @Valid @RequestBody ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO
    ) throws URISyntaxException {
        log.debug("REST request to save ContactoEmergenciaPaciente : {}", contactoEmergenciaPacienteDTO);
        if (contactoEmergenciaPacienteDTO.getId() != null) {
            throw new BadRequestAlertException("A new contactoEmergenciaPaciente cannot already have an ID", ENTITY_NAME, "idexists");
        }
        return contactoEmergenciaPacienteService
            .save(contactoEmergenciaPacienteDTO)
            .map(result -> {
                try {
                    return ResponseEntity
                        .created(new URI("/api/contacto-emergencia-pacientes/" + result.getId()))
                        .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
                        .body(result);
                } catch (URISyntaxException e) {
                    throw new RuntimeException(e);
                }
            });
    }

    /**
     * {@code PUT  /contacto-emergencia-pacientes/:id} : Updates an existing contactoEmergenciaPaciente.
     *
     * @param id the id of the contactoEmergenciaPacienteDTO to save.
     * @param contactoEmergenciaPacienteDTO the contactoEmergenciaPacienteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactoEmergenciaPacienteDTO,
     * or with status {@code 400 (Bad Request)} if the contactoEmergenciaPacienteDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the contactoEmergenciaPacienteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public Mono<ResponseEntity<ContactoEmergenciaPacienteDTO>> updateContactoEmergenciaPaciente(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO
    ) throws URISyntaxException {
        log.debug("REST request to update ContactoEmergenciaPaciente : {}, {}", id, contactoEmergenciaPacienteDTO);
        if (contactoEmergenciaPacienteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contactoEmergenciaPacienteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contactoEmergenciaPacienteRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                return contactoEmergenciaPacienteService
                    .update(contactoEmergenciaPacienteDTO)
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
     * {@code PATCH  /contacto-emergencia-pacientes/:id} : Partial updates given fields of an existing contactoEmergenciaPaciente, field will ignore if it is null
     *
     * @param id the id of the contactoEmergenciaPacienteDTO to save.
     * @param contactoEmergenciaPacienteDTO the contactoEmergenciaPacienteDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contactoEmergenciaPacienteDTO,
     * or with status {@code 400 (Bad Request)} if the contactoEmergenciaPacienteDTO is not valid,
     * or with status {@code 404 (Not Found)} if the contactoEmergenciaPacienteDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the contactoEmergenciaPacienteDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public Mono<ResponseEntity<ContactoEmergenciaPacienteDTO>> partialUpdateContactoEmergenciaPaciente(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update ContactoEmergenciaPaciente partially : {}, {}", id, contactoEmergenciaPacienteDTO);
        if (contactoEmergenciaPacienteDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, contactoEmergenciaPacienteDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        return contactoEmergenciaPacienteRepository
            .existsById(id)
            .flatMap(exists -> {
                if (!exists) {
                    return Mono.error(new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound"));
                }

                Mono<ContactoEmergenciaPacienteDTO> result = contactoEmergenciaPacienteService.partialUpdate(contactoEmergenciaPacienteDTO);

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
     * {@code GET  /contacto-emergencia-pacientes} : get all the contactoEmergenciaPacientes.
     *
     * @param pageable the pagination information.
     * @param request a {@link ServerHttpRequest} request.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contactoEmergenciaPacientes in body.
     */
    @GetMapping(value = "", produces = MediaType.APPLICATION_JSON_VALUE)
    public Mono<ResponseEntity<List<ContactoEmergenciaPacienteDTO>>> getAllContactoEmergenciaPacientes(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        ServerHttpRequest request,
        @RequestParam(name = "eagerload", required = false, defaultValue = "true") boolean eagerload
    ) {
        log.debug("REST request to get a page of ContactoEmergenciaPacientes");
        return contactoEmergenciaPacienteService
            .countAll()
            .zipWith(contactoEmergenciaPacienteService.findAll(pageable).collectList())
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
     * {@code GET  /contacto-emergencia-pacientes/:id} : get the "id" contactoEmergenciaPaciente.
     *
     * @param id the id of the contactoEmergenciaPacienteDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contactoEmergenciaPacienteDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public Mono<ResponseEntity<ContactoEmergenciaPacienteDTO>> getContactoEmergenciaPaciente(@PathVariable("id") Long id) {
        log.debug("REST request to get ContactoEmergenciaPaciente : {}", id);
        Mono<ContactoEmergenciaPacienteDTO> contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(contactoEmergenciaPacienteDTO);
    }

    /**
     * {@code DELETE  /contacto-emergencia-pacientes/:id} : delete the "id" contactoEmergenciaPaciente.
     *
     * @param id the id of the contactoEmergenciaPacienteDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public Mono<ResponseEntity<Void>> deleteContactoEmergenciaPaciente(@PathVariable("id") Long id) {
        log.debug("REST request to delete ContactoEmergenciaPaciente : {}", id);
        return contactoEmergenciaPacienteService
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
