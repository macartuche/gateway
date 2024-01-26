package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.ContactoEmergenciaPacienteDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente}.
 */
public interface ContactoEmergenciaPacienteService {
    /**
     * Save a contactoEmergenciaPaciente.
     *
     * @param contactoEmergenciaPacienteDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ContactoEmergenciaPacienteDTO> save(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO);

    /**
     * Updates a contactoEmergenciaPaciente.
     *
     * @param contactoEmergenciaPacienteDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ContactoEmergenciaPacienteDTO> update(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO);

    /**
     * Partially updates a contactoEmergenciaPaciente.
     *
     * @param contactoEmergenciaPacienteDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ContactoEmergenciaPacienteDTO> partialUpdate(ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO);

    /**
     * Get all the contactoEmergenciaPacientes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ContactoEmergenciaPacienteDTO> findAll(Pageable pageable);

    /**
     * Get all the contactoEmergenciaPacientes with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ContactoEmergenciaPacienteDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of contactoEmergenciaPacientes available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" contactoEmergenciaPaciente.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ContactoEmergenciaPacienteDTO> findOne(Long id);

    /**
     * Delete the "id" contactoEmergenciaPaciente.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
