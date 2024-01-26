package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.FirmaDigital;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.FirmaDigitalDTO;
import ec.gob.loja.gateway.service.dto.PersonaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link FirmaDigital} and its DTO {@link FirmaDigitalDTO}.
 */
@Mapper(componentModel = "spring")
public interface FirmaDigitalMapper extends EntityMapper<FirmaDigitalDTO, FirmaDigital> {
    @Mapping(target = "tipo", source = "tipo", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "persona", source = "persona", qualifiedByName = "personaIdentificacion")
    FirmaDigitalDTO toDto(FirmaDigital s);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);

    @Named("personaIdentificacion")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "identificacion", source = "identificacion")
    PersonaDTO toDtoPersonaIdentificacion(Persona persona);
}
