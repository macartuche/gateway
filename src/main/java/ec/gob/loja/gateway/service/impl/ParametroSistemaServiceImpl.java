package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.ParametroSistemaRepository;
import ec.gob.loja.gateway.service.ParametroSistemaService;
import ec.gob.loja.gateway.service.dto.ParametroSistemaDTO;
import ec.gob.loja.gateway.service.mapper.ParametroSistemaMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.ParametroSistema}.
 */
@Service
@Transactional
public class ParametroSistemaServiceImpl implements ParametroSistemaService {

    private final Logger log = LoggerFactory.getLogger(ParametroSistemaServiceImpl.class);

    private final ParametroSistemaRepository parametroSistemaRepository;

    private final ParametroSistemaMapper parametroSistemaMapper;

    public ParametroSistemaServiceImpl(
        ParametroSistemaRepository parametroSistemaRepository,
        ParametroSistemaMapper parametroSistemaMapper
    ) {
        this.parametroSistemaRepository = parametroSistemaRepository;
        this.parametroSistemaMapper = parametroSistemaMapper;
    }

    @Override
    public Mono<ParametroSistemaDTO> save(ParametroSistemaDTO parametroSistemaDTO) {
        log.debug("Request to save ParametroSistema : {}", parametroSistemaDTO);
        return parametroSistemaRepository.save(parametroSistemaMapper.toEntity(parametroSistemaDTO)).map(parametroSistemaMapper::toDto);
    }

    @Override
    public Mono<ParametroSistemaDTO> update(ParametroSistemaDTO parametroSistemaDTO) {
        log.debug("Request to update ParametroSistema : {}", parametroSistemaDTO);
        return parametroSistemaRepository.save(parametroSistemaMapper.toEntity(parametroSistemaDTO)).map(parametroSistemaMapper::toDto);
    }

    @Override
    public Mono<ParametroSistemaDTO> partialUpdate(ParametroSistemaDTO parametroSistemaDTO) {
        log.debug("Request to partially update ParametroSistema : {}", parametroSistemaDTO);

        return parametroSistemaRepository
            .findById(parametroSistemaDTO.getId())
            .map(existingParametroSistema -> {
                parametroSistemaMapper.partialUpdate(existingParametroSistema, parametroSistemaDTO);

                return existingParametroSistema;
            })
            .flatMap(parametroSistemaRepository::save)
            .map(parametroSistemaMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ParametroSistemaDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ParametroSistemas");
        return parametroSistemaRepository.findAllBy(pageable).map(parametroSistemaMapper::toDto);
    }

    public Mono<Long> countAll() {
        return parametroSistemaRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ParametroSistemaDTO> findOne(Long id) {
        log.debug("Request to get ParametroSistema : {}", id);
        return parametroSistemaRepository.findById(id).map(parametroSistemaMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ParametroSistema : {}", id);
        return parametroSistemaRepository.deleteById(id);
    }
}
