package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.EspecialidadRepository;
import ec.gob.loja.gateway.service.EspecialidadService;
import ec.gob.loja.gateway.service.dto.EspecialidadDTO;
import ec.gob.loja.gateway.service.mapper.EspecialidadMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Especialidad}.
 */
@Service
@Transactional
public class EspecialidadServiceImpl implements EspecialidadService {

    private final Logger log = LoggerFactory.getLogger(EspecialidadServiceImpl.class);

    private final EspecialidadRepository especialidadRepository;

    private final EspecialidadMapper especialidadMapper;

    public EspecialidadServiceImpl(EspecialidadRepository especialidadRepository, EspecialidadMapper especialidadMapper) {
        this.especialidadRepository = especialidadRepository;
        this.especialidadMapper = especialidadMapper;
    }

    @Override
    public Mono<EspecialidadDTO> save(EspecialidadDTO especialidadDTO) {
        log.debug("Request to save Especialidad : {}", especialidadDTO);
        return especialidadRepository.save(especialidadMapper.toEntity(especialidadDTO)).map(especialidadMapper::toDto);
    }

    @Override
    public Mono<EspecialidadDTO> update(EspecialidadDTO especialidadDTO) {
        log.debug("Request to update Especialidad : {}", especialidadDTO);
        return especialidadRepository.save(especialidadMapper.toEntity(especialidadDTO)).map(especialidadMapper::toDto);
    }

    @Override
    public Mono<EspecialidadDTO> partialUpdate(EspecialidadDTO especialidadDTO) {
        log.debug("Request to partially update Especialidad : {}", especialidadDTO);

        return especialidadRepository
            .findById(especialidadDTO.getId())
            .map(existingEspecialidad -> {
                especialidadMapper.partialUpdate(existingEspecialidad, especialidadDTO);

                return existingEspecialidad;
            })
            .flatMap(especialidadRepository::save)
            .map(especialidadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<EspecialidadDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Especialidads");
        return especialidadRepository.findAllBy(pageable).map(especialidadMapper::toDto);
    }

    public Flux<EspecialidadDTO> findAllWithEagerRelationships(Pageable pageable) {
        return especialidadRepository.findAllWithEagerRelationships(pageable).map(especialidadMapper::toDto);
    }

    public Mono<Long> countAll() {
        return especialidadRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<EspecialidadDTO> findOne(Long id) {
        log.debug("Request to get Especialidad : {}", id);
        return especialidadRepository.findOneWithEagerRelationships(id).map(especialidadMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Especialidad : {}", id);
        return especialidadRepository.deleteById(id);
    }
}
