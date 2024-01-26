package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Discapacidad;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Discapacidad} and its DTO {@link DiscapacidadDTO}.
 */
@Mapper(componentModel = "spring")
public interface DiscapacidadMapper extends EntityMapper<DiscapacidadDTO, Discapacidad> {
    @Mapping(target = "tipo", source = "tipo", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "estado", source = "estado", qualifiedByName = "catalogoItemNombre")
    DiscapacidadDTO toDto(Discapacidad s);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);
}
