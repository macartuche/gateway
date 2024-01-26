package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Persona;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Persona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PersonaRepository extends ReactiveCrudRepository<Persona, Long>, PersonaRepositoryInternal {
    Flux<Persona> findAllBy(Pageable pageable);

    @Override
    Mono<Persona> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Persona> findAllWithEagerRelationships();

    @Override
    Flux<Persona> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM persona entity WHERE entity.tipo_identificacion_id = :id")
    Flux<Persona> findByTipoIdentificacion(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.tipo_identificacion_id IS NULL")
    Flux<Persona> findAllWhereTipoIdentificacionIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.nacionalidad_id = :id")
    Flux<Persona> findByNacionalidad(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.nacionalidad_id IS NULL")
    Flux<Persona> findAllWhereNacionalidadIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.usuario_id = :id")
    Flux<Persona> findByUsuario(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.usuario_id IS NULL")
    Flux<Persona> findAllWhereUsuarioIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.genero_id = :id")
    Flux<Persona> findByGenero(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.genero_id IS NULL")
    Flux<Persona> findAllWhereGeneroIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.estado_civil_id = :id")
    Flux<Persona> findByEstadoCivil(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.estado_civil_id IS NULL")
    Flux<Persona> findAllWhereEstadoCivilIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.nivel_educacion_id = :id")
    Flux<Persona> findByNivelEducacion(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.nivel_educacion_id IS NULL")
    Flux<Persona> findAllWhereNivelEducacionIsNull();

    @Query("SELECT * FROM persona entity WHERE entity.estado_nivel_educacion_id = :id")
    Flux<Persona> findByEstadoNivelEducacion(Long id);

    @Query("SELECT * FROM persona entity WHERE entity.estado_nivel_educacion_id IS NULL")
    Flux<Persona> findAllWhereEstadoNivelEducacionIsNull();

    @Override
    <S extends Persona> Mono<S> save(S entity);

    @Override
    Flux<Persona> findAll();

    @Override
    Mono<Persona> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface PersonaRepositoryInternal {
    <S extends Persona> Mono<S> save(S entity);

    Flux<Persona> findAllBy(Pageable pageable);

    Flux<Persona> findAll();

    Mono<Persona> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Persona> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Persona> findOneWithEagerRelationships(Long id);

    Flux<Persona> findAllWithEagerRelationships();

    Flux<Persona> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
