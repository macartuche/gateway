package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.Funcionalidad}.
 */
public interface FuncionalidadService {
    /**
     * Save a funcionalidad.
     *
     * @param funcionalidadDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<FuncionalidadDTO> save(FuncionalidadDTO funcionalidadDTO);

    /**
     * Updates a funcionalidad.
     *
     * @param funcionalidadDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<FuncionalidadDTO> update(FuncionalidadDTO funcionalidadDTO);

    /**
     * Partially updates a funcionalidad.
     *
     * @param funcionalidadDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<FuncionalidadDTO> partialUpdate(FuncionalidadDTO funcionalidadDTO);

    /**
     * Get all the funcionalidads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<FuncionalidadDTO> findAll(Pageable pageable);

    /**
     * Returns the number of funcionalidads available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" funcionalidad.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<FuncionalidadDTO> findOne(Long id);

    /**
     * Delete the "id" funcionalidad.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
