package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Especialidad;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Especialidad entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EspecialidadRepository extends ReactiveCrudRepository<Especialidad, Long>, EspecialidadRepositoryInternal {
    Flux<Especialidad> findAllBy(Pageable pageable);

    @Override
    Mono<Especialidad> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Especialidad> findAllWithEagerRelationships();

    @Override
    Flux<Especialidad> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM especialidad entity WHERE entity.tipo_id = :id")
    Flux<Especialidad> findByTipo(Long id);

    @Query("SELECT * FROM especialidad entity WHERE entity.tipo_id IS NULL")
    Flux<Especialidad> findAllWhereTipoIsNull();

    @Override
    <S extends Especialidad> Mono<S> save(S entity);

    @Override
    Flux<Especialidad> findAll();

    @Override
    Mono<Especialidad> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface EspecialidadRepositoryInternal {
    <S extends Especialidad> Mono<S> save(S entity);

    Flux<Especialidad> findAllBy(Pageable pageable);

    Flux<Especialidad> findAll();

    Mono<Especialidad> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Especialidad> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Especialidad> findOneWithEagerRelationships(Long id);

    Flux<Especialidad> findAllWithEagerRelationships();

    Flux<Especialidad> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
