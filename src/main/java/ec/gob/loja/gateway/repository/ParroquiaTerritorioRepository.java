package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the ParroquiaTerritorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParroquiaTerritorioRepository
    extends ReactiveCrudRepository<ParroquiaTerritorio, Long>, ParroquiaTerritorioRepositoryInternal {
    Flux<ParroquiaTerritorio> findAllBy(Pageable pageable);

    @Override
    Mono<ParroquiaTerritorio> findOneWithEagerRelationships(Long id);

    @Override
    Flux<ParroquiaTerritorio> findAllWithEagerRelationships();

    @Override
    Flux<ParroquiaTerritorio> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM parroquia_territorio entity WHERE entity.canton_id = :id")
    Flux<ParroquiaTerritorio> findByCanton(Long id);

    @Query("SELECT * FROM parroquia_territorio entity WHERE entity.canton_id IS NULL")
    Flux<ParroquiaTerritorio> findAllWhereCantonIsNull();

    @Override
    <S extends ParroquiaTerritorio> Mono<S> save(S entity);

    @Override
    Flux<ParroquiaTerritorio> findAll();

    @Override
    Mono<ParroquiaTerritorio> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ParroquiaTerritorioRepositoryInternal {
    <S extends ParroquiaTerritorio> Mono<S> save(S entity);

    Flux<ParroquiaTerritorio> findAllBy(Pageable pageable);

    Flux<ParroquiaTerritorio> findAll();

    Mono<ParroquiaTerritorio> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<ParroquiaTerritorio> findAllBy(Pageable pageable, Criteria criteria);

    Mono<ParroquiaTerritorio> findOneWithEagerRelationships(Long id);

    Flux<ParroquiaTerritorio> findAllWithEagerRelationships();

    Flux<ParroquiaTerritorio> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
