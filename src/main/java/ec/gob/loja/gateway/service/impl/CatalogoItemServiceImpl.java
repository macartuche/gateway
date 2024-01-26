package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.CatalogoItemRepository;
import ec.gob.loja.gateway.service.CatalogoItemService;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.mapper.CatalogoItemMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.CatalogoItem}.
 */
@Service
@Transactional
public class CatalogoItemServiceImpl implements CatalogoItemService {

    private final Logger log = LoggerFactory.getLogger(CatalogoItemServiceImpl.class);

    private final CatalogoItemRepository catalogoItemRepository;

    private final CatalogoItemMapper catalogoItemMapper;

    public CatalogoItemServiceImpl(CatalogoItemRepository catalogoItemRepository, CatalogoItemMapper catalogoItemMapper) {
        this.catalogoItemRepository = catalogoItemRepository;
        this.catalogoItemMapper = catalogoItemMapper;
    }

    @Override
    public Mono<CatalogoItemDTO> save(CatalogoItemDTO catalogoItemDTO) {
        log.debug("Request to save CatalogoItem : {}", catalogoItemDTO);
        return catalogoItemRepository.save(catalogoItemMapper.toEntity(catalogoItemDTO)).map(catalogoItemMapper::toDto);
    }

    @Override
    public Mono<CatalogoItemDTO> update(CatalogoItemDTO catalogoItemDTO) {
        log.debug("Request to update CatalogoItem : {}", catalogoItemDTO);
        return catalogoItemRepository.save(catalogoItemMapper.toEntity(catalogoItemDTO)).map(catalogoItemMapper::toDto);
    }

    @Override
    public Mono<CatalogoItemDTO> partialUpdate(CatalogoItemDTO catalogoItemDTO) {
        log.debug("Request to partially update CatalogoItem : {}", catalogoItemDTO);

        return catalogoItemRepository
            .findById(catalogoItemDTO.getId())
            .map(existingCatalogoItem -> {
                catalogoItemMapper.partialUpdate(existingCatalogoItem, catalogoItemDTO);

                return existingCatalogoItem;
            })
            .flatMap(catalogoItemRepository::save)
            .map(catalogoItemMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CatalogoItemDTO> findAll(Pageable pageable) {
        log.debug("Request to get all CatalogoItems");
        return catalogoItemRepository.findAllBy(pageable).map(catalogoItemMapper::toDto);
    }

    public Mono<Long> countAll() {
        return catalogoItemRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CatalogoItemDTO> findOne(Long id) {
        log.debug("Request to get CatalogoItem : {}", id);
        return catalogoItemRepository.findById(id).map(catalogoItemMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete CatalogoItem : {}", id);
        return catalogoItemRepository.deleteById(id);
    }
}
