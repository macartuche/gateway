package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.ParroquiaTerritorio}.
 */
public interface ParroquiaTerritorioService {
    /**
     * Save a parroquiaTerritorio.
     *
     * @param parroquiaTerritorioDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ParroquiaTerritorioDTO> save(ParroquiaTerritorioDTO parroquiaTerritorioDTO);

    /**
     * Updates a parroquiaTerritorio.
     *
     * @param parroquiaTerritorioDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ParroquiaTerritorioDTO> update(ParroquiaTerritorioDTO parroquiaTerritorioDTO);

    /**
     * Partially updates a parroquiaTerritorio.
     *
     * @param parroquiaTerritorioDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ParroquiaTerritorioDTO> partialUpdate(ParroquiaTerritorioDTO parroquiaTerritorioDTO);

    /**
     * Get all the parroquiaTerritorios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ParroquiaTerritorioDTO> findAll(Pageable pageable);

    /**
     * Get all the parroquiaTerritorios with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ParroquiaTerritorioDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of parroquiaTerritorios available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" parroquiaTerritorio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ParroquiaTerritorioDTO> findOne(Long id);

    /**
     * Delete the "id" parroquiaTerritorio.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
