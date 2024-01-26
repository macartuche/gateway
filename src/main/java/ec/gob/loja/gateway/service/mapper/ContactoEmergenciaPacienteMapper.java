package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente;
import ec.gob.loja.gateway.domain.Paciente;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.ContactoEmergenciaPacienteDTO;
import ec.gob.loja.gateway.service.dto.PacienteDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link ContactoEmergenciaPaciente} and its DTO {@link ContactoEmergenciaPacienteDTO}.
 */
@Mapper(componentModel = "spring")
public interface ContactoEmergenciaPacienteMapper extends EntityMapper<ContactoEmergenciaPacienteDTO, ContactoEmergenciaPaciente> {
    @Mapping(target = "paciente", source = "paciente", qualifiedByName = "pacienteId")
    @Mapping(target = "parentezco", source = "parentezco", qualifiedByName = "catalogoItemNombre")
    ContactoEmergenciaPacienteDTO toDto(ContactoEmergenciaPaciente s);

    @Named("pacienteId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    PacienteDTO toDtoPacienteId(Paciente paciente);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);
}
