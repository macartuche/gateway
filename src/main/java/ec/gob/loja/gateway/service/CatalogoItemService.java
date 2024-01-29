package ec.gob.loja.gateway.service;

import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import java.util.List;
import org.springframework.data.domain.Pageable;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Interface for managing {@link ec.gob.loja.gateway.domain.CatalogoItem}.
 */
public interface CatalogoItemService {
    /**
     * Save a catalogoItem.
     *
     * @param catalogoItemDTO the entity to save.
     * @return the persisted entity.
     */
    Mono<CatalogoItemDTO> save(CatalogoItemDTO catalogoItemDTO);

    /**
     * Updates a catalogoItem.
     *
     * @param catalogoItemDTO the entity to update.
     * @return the persisted entity.
     */
    Mono<CatalogoItemDTO> update(CatalogoItemDTO catalogoItemDTO);

    /**
     * Partially updates a catalogoItem.
     *
     * @param catalogoItemDTO the entity to update partially.
     * @return the persisted entity.
     */
    Mono<CatalogoItemDTO> partialUpdate(CatalogoItemDTO catalogoItemDTO);

    /**
     * Get all the catalogoItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Flux<CatalogoItemDTO> findAll(Pageable pageable);

    /**
     * Returns the number of catalogoItems available.
     * @return the number of entities in the database.
     *
     */
    Mono<Long> countAll();

    /**
     * Get the "id" catalogoItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Mono<CatalogoItemDTO> findOne(Long id);

    /**
     * Delete the "id" catalogoItem.
     *
     * @param id the id of the entity.
     * @return a Mono to signal the deletion
     */
    Mono<Void> delete(Long id);

    /**
     *
     * @param codigoCatalogo
     * @return
     */
    Flux<CatalogoItemDTO> obtenerPorCodigoCatalogo(String codigoCatalogo);

    /**
     *
     * @param codigo
     * @param codigoPadre
     * @return
     */
    Mono<CatalogoItemDTO> obtenerPorCodigoYCodigoPadre(String codigo, String codigoPadre);

    /**
     *
     * @param catalogoId
     * @return
     */
    Flux<CatalogoItemDTO> obtenerCompletoPorCatalogoId(Long catalogoId);
}
