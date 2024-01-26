package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC repository for the ContactoEmergenciaPaciente entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ContactoEmergenciaPacienteRepository
    extends ReactiveCrudRepository<ContactoEmergenciaPaciente, Long>, ContactoEmergenciaPacienteRepositoryInternal {
    Flux<ContactoEmergenciaPaciente> findAllBy(Pageable pageable);

    @Override
    Mono<ContactoEmergenciaPaciente> findOneWithEagerRelationships(Long id);

    @Override
    Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships();

    @Override
    Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships(Pageable page);

    @Query("SELECT * FROM contacto_emergencia_paciente entity WHERE entity.paciente_id = :id")
    Flux<ContactoEmergenciaPaciente> findByPaciente(Long id);

    @Query("SELECT * FROM contacto_emergencia_paciente entity WHERE entity.paciente_id IS NULL")
    Flux<ContactoEmergenciaPaciente> findAllWherePacienteIsNull();

    @Query("SELECT * FROM contacto_emergencia_paciente entity WHERE entity.parentezco_id = :id")
    Flux<ContactoEmergenciaPaciente> findByParentezco(Long id);

    @Query("SELECT * FROM contacto_emergencia_paciente entity WHERE entity.parentezco_id IS NULL")
    Flux<ContactoEmergenciaPaciente> findAllWhereParentezcoIsNull();

    @Override
    <S extends ContactoEmergenciaPaciente> Mono<S> save(S entity);

    @Override
    Flux<ContactoEmergenciaPaciente> findAll();

    @Override
    Mono<ContactoEmergenciaPaciente> findById(Long id);

    @Override
    Mono<Void> deleteById(Long id);
}

interface ContactoEmergenciaPacienteRepositoryInternal {
    <S extends ContactoEmergenciaPaciente> Mono<S> save(S entity);

    Flux<ContactoEmergenciaPaciente> findAllBy(Pageable pageable);

    Flux<ContactoEmergenciaPaciente> findAll();

    Mono<ContactoEmergenciaPaciente> findById(Long id);
    // this is not supported at the moment because of https://github.com/jhipster/generator-jhipster/issues/18269
    // Flux<ContactoEmergenciaPaciente> findAllBy(Pageable pageable, Criteria criteria);

    Mono<ContactoEmergenciaPaciente> findOneWithEagerRelationships(Long id);

    Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships();

    Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships(Pageable page);

    Mono<Void> deleteById(Long id);
}
