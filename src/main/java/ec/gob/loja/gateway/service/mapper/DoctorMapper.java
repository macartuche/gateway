package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.Doctor;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.service.dto.DoctorDTO;
import ec.gob.loja.gateway.service.dto.PersonaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Doctor} and its DTO {@link DoctorDTO}.
 */
@Mapper(componentModel = "spring")
public interface DoctorMapper extends EntityMapper<DoctorDTO, Doctor> {
    @Mapping(target = "persona", source = "persona", qualifiedByName = "personaPrimerNombre")
    DoctorDTO toDto(Doctor s);

    @Named("personaPrimerNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "primerNombre", source = "primerNombre")
    PersonaDTO toDtoPersonaPrimerNombre(Persona persona);
}
