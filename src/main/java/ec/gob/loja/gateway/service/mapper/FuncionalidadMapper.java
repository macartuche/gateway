package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.Funcionalidad;
import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Funcionalidad} and its DTO {@link FuncionalidadDTO}.
 */
@Mapper(componentModel = "spring")
public interface FuncionalidadMapper extends EntityMapper<FuncionalidadDTO, Funcionalidad> {
    @Mapping(target = "padre", source = "padre", qualifiedByName = "funcionalidadId")
    FuncionalidadDTO toDto(Funcionalidad s);

    @Named("funcionalidadId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FuncionalidadDTO toDtoFuncionalidadId(Funcionalidad funcionalidad);
}
