package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.ParametroSistemaDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.ParametroSistema}.
 */
public interface ParametroSistemaService {
    /**
     * Save a parametroSistema.
     *
     * @param parametroSistemaDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<ParametroSistemaDTO> save(ParametroSistemaDTO parametroSistemaDTO);

    /**
     * Updates a parametroSistema.
     *
     * @param parametroSistemaDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<ParametroSistemaDTO> update(ParametroSistemaDTO parametroSistemaDTO);

    /**
     * Partially updates a parametroSistema.
     *
     * @param parametroSistemaDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<ParametroSistemaDTO> partialUpdate(ParametroSistemaDTO parametroSistemaDTO);

    /**
     * Get all the parametroSistemas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<ParametroSistemaDTO> findAll(Pageable pageable);

    /**
     * Returns the number of parametroSistemas available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" parametroSistema.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<ParametroSistemaDTO> findOne(Long id);

    /**
     * Delete the "id" parametroSistema.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
