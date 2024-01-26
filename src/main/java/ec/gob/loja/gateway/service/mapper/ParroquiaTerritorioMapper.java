package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CantonTerritorio;
import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ParroquiaTerritorio} and its DTO {@link ParroquiaTerritorioDTO}.
 */
@Mapper(componentModel = "spring")
public interface ParroquiaTerritorioMapper extends EntityMapper<ParroquiaTerritorioDTO, ParroquiaTerritorio> {
    @Mapping(target = "canton", source = "canton", qualifiedByName = "cantonTerritorioNombre")
    ParroquiaTerritorioDTO toDto(ParroquiaTerritorio s);

    @Named("cantonTerritorioNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CantonTerritorioDTO toDtoCantonTerritorioNombre(CantonTerritorio cantonTerritorio);
}
