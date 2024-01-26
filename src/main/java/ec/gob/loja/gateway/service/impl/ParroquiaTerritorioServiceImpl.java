package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.ParroquiaTerritorioRepository;
import ec.gob.loja.gateway.service.ParroquiaTerritorioService;
import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.ParroquiaTerritorioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.ParroquiaTerritorio}.
 */
@Service
@Transactional
public class ParroquiaTerritorioServiceImpl implements ParroquiaTerritorioService {

    private final Logger log = LoggerFactory.getLogger(ParroquiaTerritorioServiceImpl.class);

    private final ParroquiaTerritorioRepository parroquiaTerritorioRepository;

    private final ParroquiaTerritorioMapper parroquiaTerritorioMapper;

    public ParroquiaTerritorioServiceImpl(
        ParroquiaTerritorioRepository parroquiaTerritorioRepository,
        ParroquiaTerritorioMapper parroquiaTerritorioMapper
    ) {
        this.parroquiaTerritorioRepository = parroquiaTerritorioRepository;
        this.parroquiaTerritorioMapper = parroquiaTerritorioMapper;
    }

    @Override
    public Mono<ParroquiaTerritorioDTO> save(ParroquiaTerritorioDTO parroquiaTerritorioDTO) {
        log.debug("Request to save ParroquiaTerritorio : {}", parroquiaTerritorioDTO);
        return parroquiaTerritorioRepository
            .save(parroquiaTerritorioMapper.toEntity(parroquiaTerritorioDTO))
            .map(parroquiaTerritorioMapper::toDto);
    }

    @Override
    public Mono<ParroquiaTerritorioDTO> update(ParroquiaTerritorioDTO parroquiaTerritorioDTO) {
        log.debug("Request to update ParroquiaTerritorio : {}", parroquiaTerritorioDTO);
        return parroquiaTerritorioRepository
            .save(parroquiaTerritorioMapper.toEntity(parroquiaTerritorioDTO))
            .map(parroquiaTerritorioMapper::toDto);
    }

    @Override
    public Mono<ParroquiaTerritorioDTO> partialUpdate(ParroquiaTerritorioDTO parroquiaTerritorioDTO) {
        log.debug("Request to partially update ParroquiaTerritorio : {}", parroquiaTerritorioDTO);

        return parroquiaTerritorioRepository
            .findById(parroquiaTerritorioDTO.getId())
            .map(existingParroquiaTerritorio -> {
                parroquiaTerritorioMapper.partialUpdate(existingParroquiaTerritorio, parroquiaTerritorioDTO);

                return existingParroquiaTerritorio;
            })
            .flatMap(parroquiaTerritorioRepository::save)
            .map(parroquiaTerritorioMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ParroquiaTerritorioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ParroquiaTerritorios");
        return parroquiaTerritorioRepository.findAllBy(pageable).map(parroquiaTerritorioMapper::toDto);
    }

    public Flux<ParroquiaTerritorioDTO> findAllWithEagerRelationships(Pageable pageable) {
        return parroquiaTerritorioRepository.findAllWithEagerRelationships(pageable).map(parroquiaTerritorioMapper::toDto);
    }

    public Mono<Long> countAll() {
        return parroquiaTerritorioRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ParroquiaTerritorioDTO> findOne(Long id) {
        log.debug("Request to get ParroquiaTerritorio : {}", id);
        return parroquiaTerritorioRepository.findOneWithEagerRelationships(id).map(parroquiaTerritorioMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ParroquiaTerritorio : {}", id);
        return parroquiaTerritorioRepository.deleteById(id);
    }
}
