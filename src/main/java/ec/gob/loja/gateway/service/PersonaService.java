package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.PersonaDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.Persona}.
 */
public interface PersonaService {
    /**
     * Save a persona.
     *
     * @param personaDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<PersonaDTO> save(PersonaDTO personaDTO);

    /**
     * Updates a persona.
     *
     * @param personaDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<PersonaDTO> update(PersonaDTO personaDTO);

    /**
     * Partially updates a persona.
     *
     * @param personaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<PersonaDTO> partialUpdate(PersonaDTO personaDTO);

    /**
     * Get all the personas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<PersonaDTO> findAll(Pageable pageable);

    /**
     * Get all the personas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<PersonaDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of personas available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" persona.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<PersonaDTO> findOne(Long id);

    /**
     * Delete the "id" persona.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
