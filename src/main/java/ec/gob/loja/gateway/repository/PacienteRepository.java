package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Paciente;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the Paciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PacienteRepository extends ReactiveCrudRepository<Paciente, Long>, PacienteRepositoryInternal {
    Flux<Paciente> findAllBy(Pageable pageable);

    @Override
    Mono<Paciente> findOneWithEagerRelationships(Long id);

    @Override
    Flux<Paciente> findAllWithEagerRelationships();

    @Override
    Flux<Paciente> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM paciente entity WHERE entity.discapacidad_id = :id")
    Flux<Paciente> findByDiscapacidad(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.discapacidad_id IS NULL")
    Flux<Paciente> findAllWhereDiscapacidadIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.persona_id = :id")
    Flux<Paciente> findByPersona(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.persona_id IS NULL")
    Flux<Paciente> findAllWherePersonaIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.parroquia_nacimiento_id = :id")
    Flux<Paciente> findByParroquiaNacimiento(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.parroquia_nacimiento_id IS NULL")
    Flux<Paciente> findAllWhereParroquiaNacimientoIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.parroquia_residencia_id = :id")
    Flux<Paciente> findByParroquiaResidencia(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.parroquia_residencia_id IS NULL")
    Flux<Paciente> findAllWhereParroquiaResidenciaIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.autoidentificacion_etnica_id = :id")
    Flux<Paciente> findByAutoidentificacionEtnica(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.autoidentificacion_etnica_id IS NULL")
    Flux<Paciente> findAllWhereAutoidentificacionEtnicaIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.nacionalidad_etnica_id = :id")
    Flux<Paciente> findByNacionalidadEtnica(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.nacionalidad_etnica_id IS NULL")
    Flux<Paciente> findAllWhereNacionalidadEtnicaIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.pueblo_id = :id")
    Flux<Paciente> findByPueblo(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.pueblo_id IS NULL")
    Flux<Paciente> findAllWherePuebloIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.tipo_empresa_trabajo_id = :id")
    Flux<Paciente> findByTipoEmpresaTrabajo(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.tipo_empresa_trabajo_id IS NULL")
    Flux<Paciente> findAllWhereTipoEmpresaTrabajoIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.profesion_ocupacion_id = :id")
    Flux<Paciente> findByProfesionOcupacion(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.profesion_ocupacion_id IS NULL")
    Flux<Paciente> findAllWhereProfesionOcupacionIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.seguro_salud_principal_id = :id")
    Flux<Paciente> findBySeguroSaludPrincipal(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.seguro_salud_principal_id IS NULL")
    Flux<Paciente> findAllWhereSeguroSaludPrincipalIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.tipo_bono_id = :id")
    Flux<Paciente> findByTipoBono(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.tipo_bono_id IS NULL")
    Flux<Paciente> findAllWhereTipoBonoIsNull();

    @Query("SELECT * FROM paciente entity WHERE entity.procedencia_representante_id = :id")
    Flux<Paciente> findByProcedenciaRepresentante(Long id);

    @Query("SELECT * FROM paciente entity WHERE entity.procedencia_representante_id IS NULL")
    Flux<Paciente> findAllWhereProcedenciaRepresentanteIsNull();

    @Override
    <S extends Paciente> Mono<S> save(S entity);

    @Override
    Flux<Paciente> findAll();

    @Override
    Mono<Paciente> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface PacienteRepositoryInternal {
    <S extends Paciente> Mono<S> save(S entity);

    Flux<Paciente> findAllBy(Pageable pageable);

    Flux<Paciente> findAll();

    Mono<Paciente> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<Paciente> findAllBy(Pageable pageable, Criteria criteria);

    Mono<Paciente> findOneWithEagerRelationships(Long id);

    Flux<Paciente> findAllWithEagerRelationships();

    Flux<Paciente> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
