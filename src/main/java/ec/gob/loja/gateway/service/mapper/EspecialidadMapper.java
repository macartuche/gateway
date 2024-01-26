package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Especialidad;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.EspecialidadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Especialidad} and its DTO {@link EspecialidadDTO}.
 */
@Mapper(componentModel = "spring")
public interface EspecialidadMapper extends EntityMapper<EspecialidadDTO, Especialidad> {
    @Mapping(target = "tipo", source = "tipo", qualifiedByName = "catalogoItemNombre")
    EspecialidadDTO toDto(Especialidad s);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);
}
