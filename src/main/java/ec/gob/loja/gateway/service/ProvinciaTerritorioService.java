package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.ProvinciaTerritorio}.
 */
public interface ProvinciaTerritorioService {
    /**
     * Save a provinciaTerritorio.
     *
     * @param provinciaTerritorioDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ProvinciaTerritorioDTO> save(ProvinciaTerritorioDTO provinciaTerritorioDTO);

    /**
     * Updates a provinciaTerritorio.
     *
     * @param provinciaTerritorioDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ProvinciaTerritorioDTO> update(ProvinciaTerritorioDTO provinciaTerritorioDTO);

    /**
     * Partially updates a provinciaTerritorio.
     *
     * @param provinciaTerritorioDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ProvinciaTerritorioDTO> partialUpdate(ProvinciaTerritorioDTO provinciaTerritorioDTO);

    /**
     * Get all the provinciaTerritorios.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ProvinciaTerritorioDTO> findAll(Pageable pageable);

    /**
     * Returns the number of provinciaTerritorios available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" provinciaTerritorio.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ProvinciaTerritorioDTO> findOne(Long id);

    /**
     * Delete the "id" provinciaTerritorio.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
