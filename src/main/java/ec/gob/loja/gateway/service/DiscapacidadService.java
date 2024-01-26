package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.Discapacidad}.
 */
public interface DiscapacidadService {
    /**
     * Save a discapacidad.
     *
     * @param discapacidadDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<DiscapacidadDTO> save(DiscapacidadDTO discapacidadDTO);

    /**
     * Updates a discapacidad.
     *
     * @param discapacidadDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<DiscapacidadDTO> update(DiscapacidadDTO discapacidadDTO);

    /**
     * Partially updates a discapacidad.
     *
     * @param discapacidadDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<DiscapacidadDTO> partialUpdate(DiscapacidadDTO discapacidadDTO);

    /**
     * Get all the discapacidads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<DiscapacidadDTO> findAll(Pageable pageable);

    /**
     * Get all the discapacidads with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<DiscapacidadDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of discapacidads available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" discapacidad.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<DiscapacidadDTO> findOne(Long id);

    /**
     * Delete the "id" discapacidad.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
