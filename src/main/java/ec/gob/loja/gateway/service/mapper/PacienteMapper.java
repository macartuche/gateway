package ec.gob.loja.gateway.service.mapper;

import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Discapacidad;
import ec.gob.loja.gateway.domain.Paciente;
import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.service.dto.CatalogoItemDTO;
import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import ec.gob.loja.gateway.service.dto.PacienteDTO;
import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
import ec.gob.loja.gateway.service.dto.PersonaDTO;
import org.mapstruct.*;

/**
 * Mapper for the entity {@link Paciente} and its DTO {@link PacienteDTO}.
 */
@Mapper(componentModel = "spring")
public interface PacienteMapper extends EntityMapper<PacienteDTO, Paciente> {
    @Mapping(target = "discapacidad", source = "discapacidad", qualifiedByName = "discapacidadId")
    @Mapping(target = "persona", source = "persona", qualifiedByName = "personaPrimerNombre")
    @Mapping(target = "parroquiaNacimiento", source = "parroquiaNacimiento", qualifiedByName = "parroquiaTerritorioNombre")
    @Mapping(target = "parroquiaResidencia", source = "parroquiaResidencia", qualifiedByName = "parroquiaTerritorioNombre")
    @Mapping(target = "autoidentificacionEtnica", source = "autoidentificacionEtnica", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "nacionalidadEtnica", source = "nacionalidadEtnica", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "pueblo", source = "pueblo", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "tipoEmpresaTrabajo", source = "tipoEmpresaTrabajo", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "profesionOcupacion", source = "profesionOcupacion", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "seguroSaludPrincipal", source = "seguroSaludPrincipal", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "tipoBono", source = "tipoBono", qualifiedByName = "catalogoItemNombre")
    @Mapping(target = "procedenciaRepresentante", source = "procedenciaRepresentante", qualifiedByName = "catalogoItemNombre")
    PacienteDTO toDto(Paciente s);

    @Named("discapacidadId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    DiscapacidadDTO toDtoDiscapacidadId(Discapacidad discapacidad);

    @Named("personaPrimerNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "primerNombre", source = "primerNombre")
    PersonaDTO toDtoPersonaPrimerNombre(Persona persona);

    @Named("parroquiaTerritorioNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    ParroquiaTerritorioDTO toDtoParroquiaTerritorioNombre(ParroquiaTerritorio parroquiaTerritorio);

    @Named("catalogoItemNombre")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    @Mapping(target = "nombre", source = "nombre")
    CatalogoItemDTO toDtoCatalogoItemNombre(CatalogoItem catalogoItem);
}
