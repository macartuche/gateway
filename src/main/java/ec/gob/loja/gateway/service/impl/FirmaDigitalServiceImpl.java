package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.FirmaDigitalRepository;
import ec.gob.loja.gateway.service.FirmaDigitalService;
import ec.gob.loja.gateway.service.dto.FirmaDigitalDTO;
import ec.gob.loja.gateway.service.mapper.FirmaDigitalMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.FirmaDigital}.
 */
@Service
@Transactional
public class FirmaDigitalServiceImpl implements FirmaDigitalService {

    private final Logger log = LoggerFactory.getLogger(FirmaDigitalServiceImpl.class);

    private final FirmaDigitalRepository firmaDigitalRepository;

    private final FirmaDigitalMapper firmaDigitalMapper;

    public FirmaDigitalServiceImpl(FirmaDigitalRepository firmaDigitalRepository, FirmaDigitalMapper firmaDigitalMapper) {
        this.firmaDigitalRepository = firmaDigitalRepository;
        this.firmaDigitalMapper = firmaDigitalMapper;
    }

    @Override
    public Mono<FirmaDigitalDTO> save(FirmaDigitalDTO firmaDigitalDTO) {
        log.debug("Request to save FirmaDigital : {}", firmaDigitalDTO);
        return firmaDigitalRepository.save(firmaDigitalMapper.toEntity(firmaDigitalDTO)).map(firmaDigitalMapper::toDto);
    }

    @Override
    public Mono<FirmaDigitalDTO> update(FirmaDigitalDTO firmaDigitalDTO) {
        log.debug("Request to update FirmaDigital : {}", firmaDigitalDTO);
        return firmaDigitalRepository.save(firmaDigitalMapper.toEntity(firmaDigitalDTO)).map(firmaDigitalMapper::toDto);
    }

    @Override
    public Mono<FirmaDigitalDTO> partialUpdate(FirmaDigitalDTO firmaDigitalDTO) {
        log.debug("Request to partially update FirmaDigital : {}", firmaDigitalDTO);

        return firmaDigitalRepository
            .findById(firmaDigitalDTO.getId())
            .map(existingFirmaDigital -> {
                firmaDigitalMapper.partialUpdate(existingFirmaDigital, firmaDigitalDTO);

                return existingFirmaDigital;
            })
            .flatMap(firmaDigitalRepository::save)
            .map(firmaDigitalMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<FirmaDigitalDTO> findAll(Pageable pageable) {
        log.debug("Request to get all FirmaDigitals");
        return firmaDigitalRepository.findAllBy(pageable).map(firmaDigitalMapper::toDto);
    }

    public Flux<FirmaDigitalDTO> findAllWithEagerRelationships(Pageable pageable) {
        return firmaDigitalRepository.findAllWithEagerRelationships(pageable).map(firmaDigitalMapper::toDto);
    }

    public Mono<Long> countAll() {
        return firmaDigitalRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<FirmaDigitalDTO> findOne(Long id) {
        log.debug("Request to get FirmaDigital : {}", id);
        return firmaDigitalRepository.findOneWithEagerRelationships(id).map(firmaDigitalMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete FirmaDigital : {}", id);
        return firmaDigitalRepository.deleteById(id);
    }
}
