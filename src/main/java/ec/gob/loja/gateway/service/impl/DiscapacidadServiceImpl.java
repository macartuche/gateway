package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.DiscapacidadRepository;
import ec.gob.loja.gateway.service.DiscapacidadService;
import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import ec.gob.loja.gateway.service.mapper.DiscapacidadMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Discapacidad}.
 */
@Service
@Transactional
public class DiscapacidadServiceImpl implements DiscapacidadService {

    private final Logger log = LoggerFactory.getLogger(DiscapacidadServiceImpl.class);

    private final DiscapacidadRepository discapacidadRepository;

    private final DiscapacidadMapper discapacidadMapper;

    public DiscapacidadServiceImpl(DiscapacidadRepository discapacidadRepository, DiscapacidadMapper discapacidadMapper) {
        this.discapacidadRepository = discapacidadRepository;
        this.discapacidadMapper = discapacidadMapper;
    }

    @Override
    public Mono<DiscapacidadDTO> save(DiscapacidadDTO discapacidadDTO) {
        log.debug("Request to save Discapacidad : {}", discapacidadDTO);
        return discapacidadRepository.save(discapacidadMapper.toEntity(discapacidadDTO)).map(discapacidadMapper::toDto);
    }

    @Override
    public Mono<DiscapacidadDTO> update(DiscapacidadDTO discapacidadDTO) {
        log.debug("Request to update Discapacidad : {}", discapacidadDTO);
        return discapacidadRepository.save(discapacidadMapper.toEntity(discapacidadDTO)).map(discapacidadMapper::toDto);
    }

    @Override
    public Mono<DiscapacidadDTO> partialUpdate(DiscapacidadDTO discapacidadDTO) {
        log.debug("Request to partially update Discapacidad : {}", discapacidadDTO);

        return discapacidadRepository
            .findById(discapacidadDTO.getId())
            .map(existingDiscapacidad -> {
                discapacidadMapper.partialUpdate(existingDiscapacidad, discapacidadDTO);

                return existingDiscapacidad;
            })
            .flatMap(discapacidadRepository::save)
            .map(discapacidadMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<DiscapacidadDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Discapacidads");
        return discapacidadRepository.findAllBy(pageable).map(discapacidadMapper::toDto);
    }

    public Flux<DiscapacidadDTO> findAllWithEagerRelationships(Pageable pageable) {
        return discapacidadRepository.findAllWithEagerRelationships(pageable).map(discapacidadMapper::toDto);
    }

    public Mono<Long> countAll() {
        return discapacidadRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<DiscapacidadDTO> findOne(Long id) {
        log.debug("Request to get Discapacidad : {}", id);
        return discapacidadRepository.findOneWithEagerRelationships(id).map(discapacidadMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Discapacidad : {}", id);
        return discapacidadRepository.deleteById(id);
    }
}
