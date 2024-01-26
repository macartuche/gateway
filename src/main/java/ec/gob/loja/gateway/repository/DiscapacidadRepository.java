package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Discapacidad;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Discapacidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiscapacidadRepository extends ReactiveCrudRepository<Discapacidad, Long>, DiscapacidadRepositoryInternal {
    Flux<Discapacidad> findAllBy(Pageable pageable);

    @Override
    Mono<Discapacidad> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Discapacidad> findAllWithEagerRelationships();

    @Override
    Flux<Discapacidad> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM discapacidad entity WHERE entity.tipo_id = :id")
    Flux<Discapacidad> findByTipo(Long id);

    @Query("SELECT * FROM discapacidad entity WHERE entity.tipo_id IS NULL")
    Flux<Discapacidad> findAllWhereTipoIsNull();

    @Query("SELECT * FROM discapacidad entity WHERE entity.estado_id = :id")
    Flux<Discapacidad> findByEstado(Long id);

    @Query("SELECT * FROM discapacidad entity WHERE entity.estado_id IS NULL")
    Flux<Discapacidad> findAllWhereEstadoIsNull();

    @Override
    <S extends Discapacidad> Mono<S> save(S entity);

    @Override
    Flux<Discapacidad> findAll();

    @Override
    Mono<Discapacidad> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface DiscapacidadRepositoryInternal {
    <S extends Discapacidad> Mono<S> save(S entity);

    Flux<Discapacidad> findAllBy(Pageable pageable);

    Flux<Discapacidad> findAll();

    Mono<Discapacidad> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Discapacidad> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Discapacidad> findOneWithEagerRelationships(Long id);

    Flux<Discapacidad> findAllWithEagerRelationships();

    Flux<Discapacidad> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
