package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.CatalogoItem;
import feign.Param;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the CatalogoItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CatalogoItemRepository extends ReactiveCrudRepository<CatalogoItem, Long>, CatalogoItemRepositoryInternal {
    Flux<CatalogoItem> findAllBy(Pageable pageable);

    @Query("SELECT * FROM catalogo_item entity WHERE entity.catalogo_id = :id")
    Flux<CatalogoItem> findByCatalogo(Long id);

    @Query("SELECT * FROM catalogo_item entity WHERE entity.catalogo_id IS NULL")
    Flux<CatalogoItem> findAllWhereCatalogoIsNull();

    @Override
    <S extends CatalogoItem> Mono<S> save(S entity);

    @Override
    Flux<CatalogoItem> findAll();

    @Override
    Mono<CatalogoItem> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);

    @Query(
        "SELECT ci.* " +
        "FROM catalogo_item ci " +
        " JOIN catalogo c on c.id = ci.catalogo_id " +
        " where ci.activo=TRUE AND c.codigo=:codigoCatalogo"
    )
    Flux<CatalogoItem> obtenerPorCodigoCatalogo(@Param("codigoCatalogo") String codigoCatalogo);

    @Query(
        "SELECT ci.* " +
        "FROM catalogo_item ci " +
        "   JOIN catalogo c on c.id = ci.catalogo_id " +
        " WHERE item.activo=TRUE AND ci.codigo = :codigo AND cat.codigo = :codigoPadre"
    )
    Mono<CatalogoItem> obtenerPorCodigoYCodigoPadre(@Param("codigo") String codigo, @Param("codigoPadre") String codigoPadre);

    @Query("SELECT ci.* " + "FROM catalogo_item ci " + "   JOIN catalogo c on c.id = ci.catalogo_id " + "WHERE  ci.activo=TRUE AND c.id=?1")
    Flux<CatalogoItem> obtenerPorCatalogoId(Long catalogoId);

    @Query(
        "SELECT DISTINCT itm.* " +
        "FROM usuario_establecimiento ues " +
        "INNER JOIN establecimiento est ON est.id = ues.establecimiento_id " +
        "INNER JOIN catalogo_item itm ON itm.id = ues.tipo_id " +
        "WHERE ues.activo = TRUE  " +
        "AND ues.usuario_id =:usuarioId " +
        "AND ues.establecimiento_id =:establecimientoId " +
        "AND itm.activo = TRUE " +
        "ORDER BY itm.nombre ASC"
    )
    Flux<CatalogoItem> obtenerTiposTurnoPorUsuarioEstablecimiento(
        @Param("usuarioId") Long usuarioId,
        @Param("establecimientoId") Long establecimientoId
    );
}

interface CatalogoItemRepositoryInternal {
    <S extends CatalogoItem> Mono<S> save(S entity);

    Flux<CatalogoItem> findAllBy(Pageable pageable);

    Flux<CatalogoItem> findAll();

    Mono<CatalogoItem> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<CatalogoItem> findAllBy(Pageable pageable, Criteria criteria);
}
