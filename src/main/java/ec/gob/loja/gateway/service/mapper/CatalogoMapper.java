package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.Catalogo;
import ec.gob.loja.gateway.service.dto.CatalogoDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Catalogo} and its DTO {@link CatalogoDTO}.
 */
@Mapper(componentModel = "spring")
public interface CatalogoMapper extends EntityMapper<CatalogoDTO, Catalogo> {}
