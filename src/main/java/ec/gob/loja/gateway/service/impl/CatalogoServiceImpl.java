package ec.gob.loja.gateway.service.impl;

import ec.gob.loja.gateway.repository.CatalogoRepository;
import ec.gob.loja.gateway.service.CatalogoService;
import ec.gob.loja.gateway.service.dto.CatalogoDTO;
import ec.gob.loja.gateway.service.mapper.CatalogoMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Service Implementation for managing {@link ec.gob.loja.gateway.domain.Catalogo}.
 */
@Service
@Transactional
public class CatalogoServiceImpl implements CatalogoService {

    private final Logger log = LoggerFactory.getLogger(CatalogoServiceImpl.class);

    private final CatalogoRepository catalogoRepository;

    private final CatalogoMapper catalogoMapper;

    public CatalogoServiceImpl(CatalogoRepository catalogoRepository, CatalogoMapper catalogoMapper) {
        this.catalogoRepository = catalogoRepository;
        this.catalogoMapper = catalogoMapper;
    }

    @Override
    public Mono<CatalogoDTO> save(CatalogoDTO catalogoDTO) {
        log.debug("Request to save Catalogo : {}", catalogoDTO);
        return catalogoRepository.save(catalogoMapper.toEntity(catalogoDTO)).map(catalogoMapper::toDto);
    }

    @Override
    public Mono<CatalogoDTO> update(CatalogoDTO catalogoDTO) {
        log.debug("Request to update Catalogo : {}", catalogoDTO);
        return catalogoRepository.save(catalogoMapper.toEntity(catalogoDTO)).map(catalogoMapper::toDto);
    }

    @Override
    public Mono<CatalogoDTO> partialUpdate(CatalogoDTO catalogoDTO) {
        log.debug("Request to partially update Catalogo : {}", catalogoDTO);

        return catalogoRepository
            .findById(catalogoDTO.getId())
            .map(existingCatalogo -> {
                catalogoMapper.partialUpdate(existingCatalogo, catalogoDTO);

                return existingCatalogo;
            })
            .flatMap(catalogoRepository::save)
            .map(catalogoMapper::toDto);
    }

    @Override
    @Transactional(readOnly = true)
    public Flux<CatalogoDTO> findAll(Pageable pageable) {
        log.debug("Request to get all Catalogos");
        return catalogoRepository.findAllBy(pageable).map(catalogoMapper::toDto);
    }

    public Mono<Long> countAll() {
        return catalogoRepository.count();
    }

    @Override
    @Transactional(readOnly = true)
    public Mono<CatalogoDTO> findOne(Long id) {
        log.debug("Request to get Catalogo : {}", id);
        return catalogoRepository.findById(id).map(catalogoMapper::toDto);
    }

    @Override
    public Mono<Void> delete(Long id) {
        log.debug("Request to delete Catalogo : {}", id);
        return catalogoRepository.deleteById(id);
    }
}
