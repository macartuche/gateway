package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.ProvinciaTerritorioRepository;
import ec.gob.loja.gateway.service.ProvinciaTerritorioService;
import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.ProvinciaTerritorioMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.ProvinciaTerritorio}.
 */
@Service
@Transactional
public class ProvinciaTerritorioServiceImpl implements ProvinciaTerritorioService {

    private final Logger log = LoggerFactory.getLogger(ProvinciaTerritorioServiceImpl.class);

    private final ProvinciaTerritorioRepository provinciaTerritorioRepository;

    private final ProvinciaTerritorioMapper provinciaTerritorioMapper;

    public ProvinciaTerritorioServiceImpl(
        ProvinciaTerritorioRepository provinciaTerritorioRepository,
        ProvinciaTerritorioMapper provinciaTerritorioMapper
    ) {
        this.provinciaTerritorioRepository = provinciaTerritorioRepository;
        this.provinciaTerritorioMapper = provinciaTerritorioMapper;
    }

    @Override
    public Mono<ProvinciaTerritorioDTO> save(ProvinciaTerritorioDTO provinciaTerritorioDTO) {
        log.debug("Request to save ProvinciaTerritorio : {}", provinciaTerritorioDTO);
        return provinciaTerritorioRepository
            .save(provinciaTerritorioMapper.toEntity(provinciaTerritorioDTO))
            .map(provinciaTerritorioMapper::toDto);
    }

    @Override
    public Mono<ProvinciaTerritorioDTO> update(ProvinciaTerritorioDTO provinciaTerritorioDTO) {
        log.debug("Request to update ProvinciaTerritorio : {}", provinciaTerritorioDTO);
        return provinciaTerritorioRepository
            .save(provinciaTerritorioMapper.toEntity(provinciaTerritorioDTO))
            .map(provinciaTerritorioMapper::toDto);
    }

    @Override
    public Mono<ProvinciaTerritorioDTO> partialUpdate(ProvinciaTerritorioDTO provinciaTerritorioDTO) {
        log.debug("Request to partially update ProvinciaTerritorio : {}", provinciaTerritorioDTO);

        return provinciaTerritorioRepository
            .findById(provinciaTerritorioDTO.getId())
            .map(existingProvinciaTerritorio -> {
                provinciaTerritorioMapper.partialUpdate(existingProvinciaTerritorio, provinciaTerritorioDTO);

                return existingProvinciaTerritorio;
            })
            .flatMap(provinciaTerritorioRepository::save)
            .map(provinciaTerritorioMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<ProvinciaTerritorioDTO> findAll(Pageable pageable) {
        log.debug("Request to get all ProvinciaTerritorios");
        return provinciaTerritorioRepository.findAllBy(pageable).map(provinciaTerritorioMapper::toDto);
    }

    public Mono<Long> countAll() {
        return provinciaTerritorioRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<ProvinciaTerritorioDTO> findOne(Long id) {
        log.debug("Request to get ProvinciaTerritorio : {}", id);
        return provinciaTerritorioRepository.findById(id).map(provinciaTerritorioMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete ProvinciaTerritorio : {}", id);
        return provinciaTerritorioRepository.deleteById(id);
    }
}
