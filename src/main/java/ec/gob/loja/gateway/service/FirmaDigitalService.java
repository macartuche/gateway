package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.FirmaDigitalDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.FirmaDigital}.
 */
public interface FirmaDigitalService {
    /**
     * Save a firmaDigital.
     *
     * @param firmaDigitalDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<FirmaDigitalDTO> save(FirmaDigitalDTO firmaDigitalDTO);

    /**
     * Updates a firmaDigital.
     *
     * @param firmaDigitalDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<FirmaDigitalDTO> update(FirmaDigitalDTO firmaDigitalDTO);

    /**
     * Partially updates a firmaDigital.
     *
     * @param firmaDigitalDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<FirmaDigitalDTO> partialUpdate(FirmaDigitalDTO firmaDigitalDTO);

    /**
     * Get all the firmaDigitals.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<FirmaDigitalDTO> findAll(Pageable pageable);

    /**
     * Get all the firmaDigitals with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<FirmaDigitalDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of firmaDigitals available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" firmaDigital.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<FirmaDigitalDTO> findOne(Long id);

    /**
     * Delete the "id" firmaDigital.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
