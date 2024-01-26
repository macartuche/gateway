package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.domain.User;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.PersonaDTO;
import ec.gob.loja.gateway.service.dto.UserDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Persona} and its DTO {@link PersonaDTO}.
 */
@Mapper(componentModel = "spring")
public interface PersonaMapper extends EntityMapper<PersonaDTO, Persona> {
    @Mapping(target = "tipoIdentificacion", source = "tipoIdentificacion", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "nacionalidad", source = "nacionalidad", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "usuario", source = "usuario", qualifiedByName = "userLogin")
    @Mapping(target = "genero", source = "genero", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "estadoCivil", source = "estadoCivil", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "nivelEducacion", source = "nivelEducacion", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "estadoNivelEducacion", source = "estadoNivelEducacion", qualifiedByName = "catalogoItemNombre")
    PersonaDTO toDto(Persona s);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);

    @Named("userLogin")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "login", source = "login")
    UserDTO toDtoUserLogin(User user);
}
