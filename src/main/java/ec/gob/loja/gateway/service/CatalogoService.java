package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.CatalogoDTO;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.Catalogo}.
 */
public interface CatalogoService {
    /**
     * Save a catalogo.
     *
     * @param catalogoDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<CatalogoDTO> save(CatalogoDTO catalogoDTO);

    /**
     * Updates a catalogo.
     *
     * @param catalogoDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<CatalogoDTO> update(CatalogoDTO catalogoDTO);

    /**
     * Partially updates a catalogo.
     *
     * @param catalogoDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<CatalogoDTO> partialUpdate(CatalogoDTO catalogoDTO);

    /**
     * Get all the catalogos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CatalogoDTO> findAll(Pageable pageable);

    /**
     * Returns the number of catalogos available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" catalogo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<CatalogoDTO> findOne(Long id);

    /**
     * Delete the "id" catalogo.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);
}
