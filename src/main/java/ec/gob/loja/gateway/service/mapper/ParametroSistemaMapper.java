package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.ParametroSistema;
import ec.gob.loja.gateway.service.dto.ParametroSistemaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ParametroSistema} and its DTO {@link ParametroSistemaDTO}.
 */
@Mapper(componentModel = "spring")
public interface ParametroSistemaMapper extends EntityMapper<ParametroSistemaDTO, ParametroSistema> {}
