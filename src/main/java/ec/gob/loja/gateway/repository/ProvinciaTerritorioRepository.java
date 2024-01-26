package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.ProvinciaTerritorio;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the ProvinciaTerritorio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProvinciaTerritorioRepository
    extends ReactiveCrudRepository<ProvinciaTerritorio, Long>, ProvinciaTerritorioRepositoryInternal {
    Flux<ProvinciaTerritorio> findAllBy(Pageable pageable);

    @Override
    <S extends ProvinciaTerritorio> Mono<S> save(S entity);

    @Override
    Flux<ProvinciaTerritorio> findAll();

    @Override
    Mono<ProvinciaTerritorio> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ProvinciaTerritorioRepositoryInternal {
    <S extends ProvinciaTerritorio> Mono<S> save(S entity);

    Flux<ProvinciaTerritorio> findAllBy(Pageable pageable);

    Flux<ProvinciaTerritorio> findAll();

    Mono<ProvinciaTerritorio> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<ProvinciaTerritorio> findAllBy(Pageable pageable, Criteria criteria);
}
