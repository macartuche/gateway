package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.CantonTerritorioRepository;
import ec.gob.loja.gateway.service.CantonTerritorioService;
import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.CantonTerritorioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.CantonTerritorio}.
 */
@Service
@Transactional
public class CantonTerritorioServiceImpl implements CantonTerritorioService {

    private final Logger log = LoggerFactory.getLogger(CantonTerritorioServiceImpl.class);

    private final CantonTerritorioRepository cantonTerritorioRepository;

    private final CantonTerritorioMapper cantonTerritorioMapper;

    public CantonTerritorioServiceImpl(
        CantonTerritorioRepository cantonTerritorioRepository,
        CantonTerritorioMapper cantonTerritorioMapper
    ) {
        this.cantonTerritorioRepository = cantonTerritorioRepository;
        this.cantonTerritorioMapper = cantonTerritorioMapper;
    }

    @Override
    public Mono<CantonTerritorioDTO> save(CantonTerritorioDTO cantonTerritorioDTO) {
        log.debug("Request to save CantonTerritorio : {}", cantonTerritorioDTO);
        return cantonTerritorioRepository.save(cantonTerritorioMapper.toEntity(cantonTerritorioDTO)).map(cantonTerritorioMapper::toDto);
    }

    @Override
    public Mono<CantonTerritorioDTO> update(CantonTerritorioDTO cantonTerritorioDTO) {
        log.debug("Request to update CantonTerritorio : {}", cantonTerritorioDTO);
        return cantonTerritorioRepository.save(cantonTerritorioMapper.toEntity(cantonTerritorioDTO)).map(cantonTerritorioMapper::toDto);
    }

    @Override
    public Mono<CantonTerritorioDTO> partialUpdate(CantonTerritorioDTO cantonTerritorioDTO) {
        log.debug("Request to partially update CantonTerritorio : {}", cantonTerritorioDTO);

        return cantonTerritorioRepository
            .findById(cantonTerritorioDTO.getId())
            .map(existingCantonTerritorio -> {
                cantonTerritorioMapper.partialUpdate(existingCantonTerritorio, cantonTerritorioDTO);

                return existingCantonTerritorio;
            })
            .flatMap(cantonTerritorioRepository::save)
            .map(cantonTerritorioMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CantonTerritorioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CantonTerritorios");
        return cantonTerritorioRepository.findAllBy(pageable).map(cantonTerritorioMapper::toDto);
    }

    public Flux<CantonTerritorioDTO> findAllWithEagerRelationships(Pageable pageable) {
        return cantonTerritorioRepository.findAllWithEagerRelationships(pageable).map(cantonTerritorioMapper::toDto);
    }

    public Mono<Long> countAll() {
        return cantonTerritorioRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CantonTerritorioDTO> findOne(Long id) {
        log.debug("Request to get CantonTerritorio : {}", id);
        return cantonTerritorioRepository.findOneWithEagerRelationships(id).map(cantonTerritorioMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete CantonTerritorio : {}", id);
        return cantonTerritorioRepository.deleteById(id);
    }
}
