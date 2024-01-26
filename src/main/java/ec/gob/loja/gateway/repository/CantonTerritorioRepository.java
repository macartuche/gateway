package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.CantonTerritorio;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the CantonTerritorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CantonTerritorioRepository extends ReactiveCrudRepository<CantonTerritorio, Long>, CantonTerritorioRepositoryInternal {
    Flux<CantonTerritorio> findAllBy(Pageable pageable);

    @Override
    Mono<CantonTerritorio> findOneWithEagerRelationships(Long id);

    @Override
    Flux<CantonTerritorio> findAllWithEagerRelationships();

    @Override
    Flux<CantonTerritorio> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM canton_territorio entity WHERE entity.provincia_id = :id")
    Flux<CantonTerritorio> findByProvincia(Long id);

    @Query("SELECT * FROM canton_territorio entity WHERE entity.provincia_id IS NULL")
    Flux<CantonTerritorio> findAllWhereProvinciaIsNull();

    @Override
    <S extends CantonTerritorio> Mono<S> save(S entity);

    @Override
    Flux<CantonTerritorio> findAll();

    @Override
    Mono<CantonTerritorio> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface CantonTerritorioRepositoryInternal {
    <S extends CantonTerritorio> Mono<S> save(S entity);

    Flux<CantonTerritorio> findAllBy(Pageable pageable);

    Flux<CantonTerritorio> findAll();

    Mono<CantonTerritorio> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<CantonTerritorio> findAllBy(Pageable pageable, Criteria criteria);

    Mono<CantonTerritorio> findOneWithEagerRelationships(Long id);

    Flux<CantonTerritorio> findAllWithEagerRelationships();

    Flux<CantonTerritorio> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
