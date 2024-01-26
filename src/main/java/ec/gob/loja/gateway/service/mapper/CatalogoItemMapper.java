package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.Catalogo;
import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.service.dto.CatalogoDTO;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CatalogoItem} and its DTO {@link CatalogoItemDTO}.
 */
@Mapper(componentModel = "spring")
public interface CatalogoItemMapper extends EntityMapper<CatalogoItemDTO, CatalogoItem> {
    @Mapping(target = "catalogo", source = "catalogo", qualifiedByName = "catalogoId")
    CatalogoItemDTO toDto(CatalogoItem s);

    @Named("catalogoId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CatalogoDTO toDtoCatalogoId(Catalogo catalogo);
}
