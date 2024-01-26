package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.FirmaDigital;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the FirmaDigital entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FirmaDigitalRepository extends ReactiveCrudRepository<FirmaDigital, Long>, FirmaDigitalRepositoryInternal {
    Flux<FirmaDigital> findAllBy(Pageable pageable);

    @Override
    Mono<FirmaDigital> findOneWithEagerRelationships(Long id);

    @Override
    Flux<FirmaDigital> findAllWithEagerRelationships();

    @Override
    Flux<FirmaDigital> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM firma_digital entity WHERE entity.tipo_id = :id")
    Flux<FirmaDigital> findByTipo(Long id);

    @Query("SELECT * FROM firma_digital entity WHERE entity.tipo_id IS NULL")
    Flux<FirmaDigital> findAllWhereTipoIsNull();

    @Query("SELECT * FROM firma_digital entity WHERE entity.persona_id = :id")
    Flux<FirmaDigital> findByPersona(Long id);

    @Query("SELECT * FROM firma_digital entity WHERE entity.persona_id IS NULL")
    Flux<FirmaDigital> findAllWherePersonaIsNull();

    @Override
    <S extends FirmaDigital> Mono<S> save(S entity);

    @Override
    Flux<FirmaDigital> findAll();

    @Override
    Mono<FirmaDigital> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface FirmaDigitalRepositoryInternal {
    <S extends FirmaDigital> Mono<S> save(S entity);

    Flux<FirmaDigital> findAllBy(Pageable pageable);

    Flux<FirmaDigital> findAll();

    Mono<FirmaDigital> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<FirmaDigital> findAllBy(Pageable pageable, Criteria criteria);

    Mono<FirmaDigital> findOneWithEagerRelationships(Long id);

    Flux<FirmaDigital> findAllWithEagerRelationships();

    Flux<FirmaDigital> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
