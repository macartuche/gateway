package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.PacienteRepository;
import ec.gob.loja.gateway.service.PacienteService;
import ec.gob.loja.gateway.service.dto.PacienteDTO;
import ec.gob.loja.gateway.service.mapper.PacienteMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Paciente}.
 */
@Service
@Transactional
public class PacienteServiceImpl implements PacienteService {

    private final Logger log = LoggerFactory.getLogger(PacienteServiceImpl.class);

    private final PacienteRepository pacienteRepository;

    private final PacienteMapper pacienteMapper;

    public PacienteServiceImpl(PacienteRepository pacienteRepository, PacienteMapper pacienteMapper) {
        this.pacienteRepository = pacienteRepository;
        this.pacienteMapper = pacienteMapper;
    }

    @Override
    public Mono<PacienteDTO> save(PacienteDTO pacienteDTO) {
        log.debug("Request to save Paciente : {}", pacienteDTO);
        return pacienteRepository.save(pacienteMapper.toEntity(pacienteDTO)).map(pacienteMapper::toDto);
    }

    @Override
    public Mono<PacienteDTO> update(PacienteDTO pacienteDTO) {
        log.debug("Request to update Paciente : {}", pacienteDTO);
        return pacienteRepository.save(pacienteMapper.toEntity(pacienteDTO)).map(pacienteMapper::toDto);
    }

    @Override
    public Mono<PacienteDTO> partialUpdate(PacienteDTO pacienteDTO) {
        log.debug("Request to partially update Paciente : {}", pacienteDTO);

        return pacienteRepository
            .findById(pacienteDTO.getId())
            .map(existingPaciente -> {
                pacienteMapper.partialUpdate(existingPaciente, pacienteDTO);

                return existingPaciente;
            })
            .flatMap(pacienteRepository::save)
            .map(pacienteMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<PacienteDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Pacientes");
        return pacienteRepository.findAllBy(pageable).map(pacienteMapper::toDto);
    }

    public Flux<PacienteDTO> findAllWithEagerRelationships(Pageable pageable) {
        return pacienteRepository.findAllWithEagerRelationships(pageable).map(pacienteMapper::toDto);
    }

    public Mono<Long> countAll() {
        return pacienteRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<PacienteDTO> findOne(Long id) {
        log.debug("Request to get Paciente : {}", id);
        return pacienteRepository.findOneWithEagerRelationships(id).map(pacienteMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Paciente : {}", id);
        return pacienteRepository.deleteById(id);
    }
}
