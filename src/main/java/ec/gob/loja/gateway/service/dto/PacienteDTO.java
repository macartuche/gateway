package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.Paciente} entity.
 */
@Schema(description = "The Paciente entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PacienteDTO implements Serializable {

    private Long id;

    /**
     * lugarNacimiento
     */
    @NotNull(message = "must not be null")
    @Schema(description = "lugarNacimiento", required = true)
    private String lugarNacimiento;

    /**
     * fecha de nacimiento
     */
    @NotNull(message = "must not be null")
    @Schema(description = "fecha de nacimiento", required = true)
    private LocalDate fechaNacimiento;

    /**
     * calle principal
     */
    @Schema(description = "calle principal")
    private String callePrincipal;

    /**
     * numero
     */
    @Schema(description = "numero")
    private String numeroCasa;

    /**
     * calle secundaria
     */
    @Schema(description = "calle secundaria")
    private String calleSecundaria;

    /**
     * barrio
     */
    @NotNull(message = "must not be null")
    @Schema(description = "barrio", required = true)
    private String barrio;

    /**
     * referencia de domicilio
     */
    @Schema(description = "referencia de domicilio")
    private String referenciaDomicilio;

    /**
     * seguro Salud Secundario
     */
    @Schema(description = "seguro Salud Secundario")
    private String seguroSaludSecundario;

    /**
     * identificacion de representante en caso de aplicar
     */
    @Schema(description = "identificacion de representante en caso de aplicar")
    private String identificacionRepresentante;

    /**
     * discapacidad de persona en el caso de ser aplicable
     */
    @Schema(description = "discapacidad de persona en el caso de ser aplicable")
    private DiscapacidadDTO discapacidad;

    private PersonaDTO persona;

    private ParroquiaTerritorioDTO parroquiaNacimiento;

    private ParroquiaTerritorioDTO parroquiaResidencia;

    private CatalogoItemDTO autoidentificacionEtnica;

    private CatalogoItemDTO nacionalidadEtnica;

    private CatalogoItemDTO pueblo;

    private CatalogoItemDTO tipoEmpresaTrabajo;

    private CatalogoItemDTO profesionOcupacion;

    private CatalogoItemDTO seguroSaludPrincipal;

    private CatalogoItemDTO tipoBono;

    private CatalogoItemDTO procedenciaRepresentante;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLugarNacimiento() {
        return lugarNacimiento;
    }

    public void setLugarNacimiento(String lugarNacimiento) {
        this.lugarNacimiento = lugarNacimiento;
    }

    public LocalDate getFechaNacimiento() {
        return fechaNacimiento;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCallePrincipal() {
        return callePrincipal;
    }

    public void setCallePrincipal(String callePrincipal) {
        this.callePrincipal = callePrincipal;
    }

    public String getNumeroCasa() {
        return numeroCasa;
    }

    public void setNumeroCasa(String numeroCasa) {
        this.numeroCasa = numeroCasa;
    }

    public String getCalleSecundaria() {
        return calleSecundaria;
    }

    public void setCalleSecundaria(String calleSecundaria) {
        this.calleSecundaria = calleSecundaria;
    }

    public String getBarrio() {
        return barrio;
    }

    public void setBarrio(String barrio) {
        this.barrio = barrio;
    }

    public String getReferenciaDomicilio() {
        return referenciaDomicilio;
    }

    public void setReferenciaDomicilio(String referenciaDomicilio) {
        this.referenciaDomicilio = referenciaDomicilio;
    }

    public String getSeguroSaludSecundario() {
        return seguroSaludSecundario;
    }

    public void setSeguroSaludSecundario(String seguroSaludSecundario) {
        this.seguroSaludSecundario = seguroSaludSecundario;
    }

    public String getIdentificacionRepresentante() {
        return identificacionRepresentante;
    }

    public void setIdentificacionRepresentante(String identificacionRepresentante) {
        this.identificacionRepresentante = identificacionRepresentante;
    }

    public DiscapacidadDTO getDiscapacidad() {
        return discapacidad;
    }

    public void setDiscapacidad(DiscapacidadDTO discapacidad) {
        this.discapacidad = discapacidad;
    }

    public PersonaDTO getPersona() {
        return persona;
    }

    public void setPersona(PersonaDTO persona) {
        this.persona = persona;
    }

    public ParroquiaTerritorioDTO getParroquiaNacimiento() {
        return parroquiaNacimiento;
    }

    public void setParroquiaNacimiento(ParroquiaTerritorioDTO parroquiaNacimiento) {
        this.parroquiaNacimiento = parroquiaNacimiento;
    }

    public ParroquiaTerritorioDTO getParroquiaResidencia() {
        return parroquiaResidencia;
    }

    public void setParroquiaResidencia(ParroquiaTerritorioDTO parroquiaResidencia) {
        this.parroquiaResidencia = parroquiaResidencia;
    }

    public CatalogoItemDTO getAutoidentificacionEtnica() {
        return autoidentificacionEtnica;
    }

    public void setAutoidentificacionEtnica(CatalogoItemDTO autoidentificacionEtnica) {
        this.autoidentificacionEtnica = autoidentificacionEtnica;
    }

    public CatalogoItemDTO getNacionalidadEtnica() {
        return nacionalidadEtnica;
    }

    public void setNacionalidadEtnica(CatalogoItemDTO nacionalidadEtnica) {
        this.nacionalidadEtnica = nacionalidadEtnica;
    }

    public CatalogoItemDTO getPueblo() {
        return pueblo;
    }

    public void setPueblo(CatalogoItemDTO pueblo) {
        this.pueblo = pueblo;
    }

    public CatalogoItemDTO getTipoEmpresaTrabajo() {
        return tipoEmpresaTrabajo;
    }

    public void setTipoEmpresaTrabajo(CatalogoItemDTO tipoEmpresaTrabajo) {
        this.tipoEmpresaTrabajo = tipoEmpresaTrabajo;
    }

    public CatalogoItemDTO getProfesionOcupacion() {
        return profesionOcupacion;
    }

    public void setProfesionOcupacion(CatalogoItemDTO profesionOcupacion) {
        this.profesionOcupacion = profesionOcupacion;
    }

    public CatalogoItemDTO getSeguroSaludPrincipal() {
        return seguroSaludPrincipal;
    }

    public void setSeguroSaludPrincipal(CatalogoItemDTO seguroSaludPrincipal) {
        this.seguroSaludPrincipal = seguroSaludPrincipal;
    }

    public CatalogoItemDTO getTipoBono() {
        return tipoBono;
    }

    public void setTipoBono(CatalogoItemDTO tipoBono) {
        this.tipoBono = tipoBono;
    }

    public CatalogoItemDTO getProcedenciaRepresentante() {
        return procedenciaRepresentante;
    }

    public void setProcedenciaRepresentante(CatalogoItemDTO procedenciaRepresentante) {
        this.procedenciaRepresentante = procedenciaRepresentante;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PacienteDTO)) {
            return false;
        }

        PacienteDTO pacienteDTO = (PacienteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, pacienteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PacienteDTO{" +
            "id=" + getId() +
            ", lugarNacimiento='" + getLugarNacimiento() + "'" +
            ", fechaNacimiento='" + getFechaNacimiento() + "'" +
            ", callePrincipal='" + getCallePrincipal() + "'" +
            ", numeroCasa='" + getNumeroCasa() + "'" +
            ", calleSecundaria='" + getCalleSecundaria() + "'" +
            ", barrio='" + getBarrio() + "'" +
            ", referenciaDomicilio='" + getReferenciaDomicilio() + "'" +
            ", seguroSaludSecundario='" + getSeguroSaludSecundario() + "'" +
            ", identificacionRepresentante='" + getIdentificacionRepresentante() + "'" +
            ", discapacidad=" + getDiscapacidad() +
            ", persona=" + getPersona() +
            ", parroquiaNacimiento=" + getParroquiaNacimiento() +
            ", parroquiaResidencia=" + getParroquiaResidencia() +
            ", autoidentificacionEtnica=" + getAutoidentificacionEtnica() +
            ", nacionalidadEtnica=" + getNacionalidadEtnica() +
            ", pueblo=" + getPueblo() +
            ", tipoEmpresaTrabajo=" + getTipoEmpresaTrabajo() +
            ", profesionOcupacion=" + getProfesionOcupacion() +
            ", seguroSaludPrincipal=" + getSeguroSaludPrincipal() +
            ", tipoBono=" + getTipoBono() +
            ", procedenciaRepresentante=" + getProcedenciaRepresentante() +
            "}";
    }
}
