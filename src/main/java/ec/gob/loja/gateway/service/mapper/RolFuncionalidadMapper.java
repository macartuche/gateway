package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.Funcionalidad;
import ec.gob.loja.gateway.domain.RolFuncionalidad;
import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
import ec.gob.loja.gateway.service.dto.RolFuncionalidadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link RolFuncionalidad} and its DTO {@link RolFuncionalidadDTO}.
 */
@Mapper(componentModel = "spring")
public interface RolFuncionalidadMapper extends EntityMapper<RolFuncionalidadDTO, RolFuncionalidad> {
    @Mapping(target = "funcionalidad", source = "funcionalidad", qualifiedByName = "funcionalidadNombre")
    RolFuncionalidadDTO toDto(RolFuncionalidad s);

    @Named("funcionalidadNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    FuncionalidadDTO toDtoFuncionalidadNombre(Funcionalidad funcionalidad);
}
