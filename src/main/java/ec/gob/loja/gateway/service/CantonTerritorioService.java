package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.CantonTerritorio}.
 */
public interface CantonTerritorioService {
    /**
     * Save a cantonTerritorio.
     *
     * @param cantonTerritorioDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<CantonTerritorioDTO> save(CantonTerritorioDTO cantonTerritorioDTO);

    /**
     * Updates a cantonTerritorio.
     *
     * @param cantonTerritorioDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<CantonTerritorioDTO> update(CantonTerritorioDTO cantonTerritorioDTO);

    /**
     * Partially updates a cantonTerritorio.
     *
     * @param cantonTerritorioDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<CantonTerritorioDTO> partialUpdate(CantonTerritorioDTO cantonTerritorioDTO);

    /**
     * Get all the cantonTerritorios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CantonTerritorioDTO> findAll(Pageable pageable);

    /**
     * Get all the cantonTerritorios with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CantonTerritorioDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of cantonTerritorios available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" cantonTerritorio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<CantonTerritorioDTO> findOne(Long id);

    /**
     * Delete the "id" cantonTerritorio.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
