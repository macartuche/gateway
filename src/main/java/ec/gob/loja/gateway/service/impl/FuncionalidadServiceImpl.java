package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.FuncionalidadRepository;
import ec.gob.loja.gateway.service.FuncionalidadService;
import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
import ec.gob.loja.gateway.service.mapper.FuncionalidadMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Funcionalidad}.
 */
@Service
@Transactional
public class FuncionalidadServiceImpl implements FuncionalidadService {

    private final Logger log = LoggerFactory.getLogger(FuncionalidadServiceImpl.class);

    private final FuncionalidadRepository funcionalidadRepository;

    private final FuncionalidadMapper funcionalidadMapper;

    public FuncionalidadServiceImpl(FuncionalidadRepository funcionalidadRepository, FuncionalidadMapper funcionalidadMapper) {
        this.funcionalidadRepository = funcionalidadRepository;
        this.funcionalidadMapper = funcionalidadMapper;
    }

    @Override
    public Mono<FuncionalidadDTO> save(FuncionalidadDTO funcionalidadDTO) {
        log.debug("Request to save Funcionalidad : {}", funcionalidadDTO);
        return funcionalidadRepository.save(funcionalidadMapper.toEntity(funcionalidadDTO)).map(funcionalidadMapper::toDto);
    }

    @Override
    public Mono<FuncionalidadDTO> update(FuncionalidadDTO funcionalidadDTO) {
        log.debug("Request to update Funcionalidad : {}", funcionalidadDTO);
        return funcionalidadRepository.save(funcionalidadMapper.toEntity(funcionalidadDTO)).map(funcionalidadMapper::toDto);
    }

    @Override
    public Mono<FuncionalidadDTO> partialUpdate(FuncionalidadDTO funcionalidadDTO) {
        log.debug("Request to partially update Funcionalidad : {}", funcionalidadDTO);

        return funcionalidadRepository
            .findById(funcionalidadDTO.getId())
            .map(existingFuncionalidad -> {
                funcionalidadMapper.partialUpdate(existingFuncionalidad, funcionalidadDTO);

                return existingFuncionalidad;
            })
            .flatMap(funcionalidadRepository::save)
            .map(funcionalidadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<FuncionalidadDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Funcionalidads");
        return funcionalidadRepository.findAllBy(pageable).map(funcionalidadMapper::toDto);
    }

    public Mono<Long> countAll() {
        return funcionalidadRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<FuncionalidadDTO> findOne(Long id) {
        log.debug("Request to get Funcionalidad : {}", id);
        return funcionalidadRepository.findById(id).map(funcionalidadMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Funcionalidad : {}", id);
        return funcionalidadRepository.deleteById(id);
    }
}
