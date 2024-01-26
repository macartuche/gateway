package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.ProvinciaTerritorio;
import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ProvinciaTerritorio} and its DTO {@link ProvinciaTerritorioDTO}.
 */
@Mapper(componentModel = "spring")
public interface ProvinciaTerritorioMapper extends EntityMapper<ProvinciaTerritorioDTO, ProvinciaTerritorio> {}
