package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CantonTerritorio;
import ec.gob.loja.gateway.domain.ProvinciaTerritorio;
import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link CantonTerritorio} and its DTO {@link CantonTerritorioDTO}.
 */
@Mapper(componentModel = "spring")
public interface CantonTerritorioMapper extends EntityMapper<CantonTerritorioDTO, CantonTerritorio> {
    @Mapping(target = "provincia", source = "provincia", qualifiedByName = "provinciaTerritorioNombre")
    CantonTerritorioDTO toDto(CantonTerritorio s);

    @Named("provinciaTerritorioNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    ProvinciaTerritorioDTO toDtoProvinciaTerritorioNombre(ProvinciaTerritorio provinciaTerritorio);
}
