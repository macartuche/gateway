package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.RolFuncionalidadDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.RolFuncionalidad}.
 */
public interface RolFuncionalidadService {
    /**
     * Save a rolFuncionalidad.
     *
     * @param rolFuncionalidadDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<RolFuncionalidadDTO> save(RolFuncionalidadDTO rolFuncionalidadDTO);

    /**
     * Updates a rolFuncionalidad.
     *
     * @param rolFuncionalidadDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<RolFuncionalidadDTO> update(RolFuncionalidadDTO rolFuncionalidadDTO);

    /**
     * Partially updates a rolFuncionalidad.
     *
     * @param rolFuncionalidadDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<RolFuncionalidadDTO> partialUpdate(RolFuncionalidadDTO rolFuncionalidadDTO);

    /**
     * Get all the rolFuncionalidads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<RolFuncionalidadDTO> findAll(Pageable pageable);

    /**
     * Get all the rolFuncionalidads with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<RolFuncionalidadDTO> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Returns the number of rolFuncionalidads available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" rolFuncionalidad.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<RolFuncionalidadDTO> findOne(Long id);

    /**
     * Delete the "id" rolFuncionalidad.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
