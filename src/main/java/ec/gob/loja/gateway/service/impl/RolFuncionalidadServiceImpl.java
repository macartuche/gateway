package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.RolFuncionalidadRepository;
import ec.gob.loja.gateway.service.RolFuncionalidadService;
import ec.gob.loja.gateway.service.dto.RolFuncionalidadDTO;
import ec.gob.loja.gateway.service.mapper.RolFuncionalidadMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.RolFuncionalidad}.
 */
@Service
@Transactional
public class RolFuncionalidadServiceImpl implements RolFuncionalidadService {

    private final Logger log = LoggerFactory.getLogger(RolFuncionalidadServiceImpl.class);

    private final RolFuncionalidadRepository rolFuncionalidadRepository;

    private final RolFuncionalidadMapper rolFuncionalidadMapper;

    public RolFuncionalidadServiceImpl(
        RolFuncionalidadRepository rolFuncionalidadRepository,
        RolFuncionalidadMapper rolFuncionalidadMapper
    ) {
        this.rolFuncionalidadRepository = rolFuncionalidadRepository;
        this.rolFuncionalidadMapper = rolFuncionalidadMapper;
    }

    @Override
    public Mono<RolFuncionalidadDTO> save(RolFuncionalidadDTO rolFuncionalidadDTO) {
        log.debug("Request to save RolFuncionalidad : {}", rolFuncionalidadDTO);
        return rolFuncionalidadRepository.save(rolFuncionalidadMapper.toEntity(rolFuncionalidadDTO)).map(rolFuncionalidadMapper::toDto);
    }

    @Override
    public Mono<RolFuncionalidadDTO> update(RolFuncionalidadDTO rolFuncionalidadDTO) {
        log.debug("Request to update RolFuncionalidad : {}", rolFuncionalidadDTO);
        return rolFuncionalidadRepository.save(rolFuncionalidadMapper.toEntity(rolFuncionalidadDTO)).map(rolFuncionalidadMapper::toDto);
    }

    @Override
    public Mono<RolFuncionalidadDTO> partialUpdate(RolFuncionalidadDTO rolFuncionalidadDTO) {
        log.debug("Request to partially update RolFuncionalidad : {}", rolFuncionalidadDTO);

        return rolFuncionalidadRepository
            .findById(rolFuncionalidadDTO.getId())
            .map(existingRolFuncionalidad -> {
                rolFuncionalidadMapper.partialUpdate(existingRolFuncionalidad, rolFuncionalidadDTO);

                return existingRolFuncionalidad;
            })
            .flatMap(rolFuncionalidadRepository::save)
            .map(rolFuncionalidadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<RolFuncionalidadDTO> findAll(Pageable pageable) {
        log.debug("Request to get all RolFuncionalidads");
        return rolFuncionalidadRepository.findAllBy(pageable).map(rolFuncionalidadMapper::toDto);
    }

    public Flux<RolFuncionalidadDTO> findAllWithEagerRelationships(Pageable pageable) {
        return rolFuncionalidadRepository.findAllWithEagerRelationships(pageable).map(rolFuncionalidadMapper::toDto);
    }

    public Mono<Long> countAll() {
        return rolFuncionalidadRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<RolFuncionalidadDTO> findOne(Long id) {
        log.debug("Request to get RolFuncionalidad : {}", id);
        return rolFuncionalidadRepository.findOneWithEagerRelationships(id).map(rolFuncionalidadMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete RolFuncionalidad : {}", id);
        return rolFuncionalidadRepository.deleteById(id);
    }
}
