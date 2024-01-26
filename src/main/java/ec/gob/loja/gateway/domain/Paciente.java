package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The Paciente entity.
 * @author Usuario
 */
@Table("paciente")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * lugarNacimiento
     */
    @NotNull(message = "must not be null")
    @Column("lugar_nacimiento")
    private String lugarNacimiento;

    /**
     * fecha de nacimiento
     */
    @NotNull(message = "must not be null")
    @Column("fecha_nacimiento")
    private LocalDate fechaNacimiento;

    /**
     * calle principal
     */
    @Column("calle_principal")
    private String callePrincipal;

    /**
     * numero
     */
    @Column("numero_casa")
    private String numeroCasa;

    /**
     * calle secundaria
     */
    @Column("calle_secundaria")
    private String calleSecundaria;

    /**
     * barrio
     */
    @NotNull(message = "must not be null")
    @Column("barrio")
    private String barrio;

    /**
     * referencia de domicilio
     */
    @Column("referencia_domicilio")
    private String referenciaDomicilio;

    /**
     * seguro Salud Secundario
     */
    @Column("seguro_salud_secundario")
    private String seguroSaludSecundario;

    /**
     * identificacion de representante en caso de aplicar
     */
    @Column("identificacion_representante")
    private String identificacionRepresentante;

    /**
     * discapacidad de persona en el caso de ser aplicable
     */
    @Transient
    @JsonIgnoreProperties(value = { "tipo", "estado" }, allowSetters = true)
    private Discapacidad discapacidad;

    @Transient
    @JsonIgnoreProperties(
        value = { "tipoIdentificacion", "nacionalidad", "usuario", "genero", "estadoCivil", "nivelEducacion", "estadoNivelEducacion" },
        allowSetters = true
    )
    private Persona persona;

    @Transient
    @JsonIgnoreProperties(value = { "canton" }, allowSetters = true)
    private ParroquiaTerritorio parroquiaNacimiento;

    @Transient
    @JsonIgnoreProperties(value = { "canton" }, allowSetters = true)
    private ParroquiaTerritorio parroquiaResidencia;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem autoidentificacionEtnica;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem nacionalidadEtnica;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem pueblo;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipoEmpresaTrabajo;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem profesionOcupacion;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem seguroSaludPrincipal;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipoBono;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem procedenciaRepresentante;

    @Column("discapacidad_id")
    private Long discapacidadId;

    @Column("persona_id")
    private Long personaId;

    @Column("parroquia_nacimiento_id")
    private Long parroquiaNacimientoId;

    @Column("parroquia_residencia_id")
    private Long parroquiaResidenciaId;

    @Column("autoidentificacion_etnica_id")
    private Long autoidentificacionEtnicaId;

    @Column("nacionalidad_etnica_id")
    private Long nacionalidadEtnicaId;

    @Column("pueblo_id")
    private Long puebloId;

    @Column("tipo_empresa_trabajo_id")
    private Long tipoEmpresaTrabajoId;

    @Column("profesion_ocupacion_id")
    private Long profesionOcupacionId;

    @Column("seguro_salud_principal_id")
    private Long seguroSaludPrincipalId;

    @Column("tipo_bono_id")
    private Long tipoBonoId;

    @Column("procedencia_representante_id")
    private Long procedenciaRepresentanteId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Paciente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLugarNacimiento() {
        return this.lugarNacimiento;
    }

    public Paciente lugarNacimiento(String lugarNacimiento) {
        this.setLugarNacimiento(lugarNacimiento);
        return this;
    }

    public void setLugarNacimiento(String lugarNacimiento) {
        this.lugarNacimiento = lugarNacimiento;
    }

    public LocalDate getFechaNacimiento() {
        return this.fechaNacimiento;
    }

    public Paciente fechaNacimiento(LocalDate fechaNacimiento) {
        this.setFechaNacimiento(fechaNacimiento);
        return this;
    }

    public void setFechaNacimiento(LocalDate fechaNacimiento) {
        this.fechaNacimiento = fechaNacimiento;
    }

    public String getCallePrincipal() {
        return this.callePrincipal;
    }

    public Paciente callePrincipal(String callePrincipal) {
        this.setCallePrincipal(callePrincipal);
        return this;
    }

    public void setCallePrincipal(String callePrincipal) {
        this.callePrincipal = callePrincipal;
    }

    public String getNumeroCasa() {
        return this.numeroCasa;
    }

    public Paciente numeroCasa(String numeroCasa) {
        this.setNumeroCasa(numeroCasa);
        return this;
    }

    public void setNumeroCasa(String numeroCasa) {
        this.numeroCasa = numeroCasa;
    }

    public String getCalleSecundaria() {
        return this.calleSecundaria;
    }

    public Paciente calleSecundaria(String calleSecundaria) {
        this.setCalleSecundaria(calleSecundaria);
        return this;
    }

    public void setCalleSecundaria(String calleSecundaria) {
        this.calleSecundaria = calleSecundaria;
    }

    public String getBarrio() {
        return this.barrio;
    }

    public Paciente barrio(String barrio) {
        this.setBarrio(barrio);
        return this;
    }

    public void setBarrio(String barrio) {
        this.barrio = barrio;
    }

    public String getReferenciaDomicilio() {
        return this.referenciaDomicilio;
    }

    public Paciente referenciaDomicilio(String referenciaDomicilio) {
        this.setReferenciaDomicilio(referenciaDomicilio);
        return this;
    }

    public void setReferenciaDomicilio(String referenciaDomicilio) {
        this.referenciaDomicilio = referenciaDomicilio;
    }

    public String getSeguroSaludSecundario() {
        return this.seguroSaludSecundario;
    }

    public Paciente seguroSaludSecundario(String seguroSaludSecundario) {
        this.setSeguroSaludSecundario(seguroSaludSecundario);
        return this;
    }

    public void setSeguroSaludSecundario(String seguroSaludSecundario) {
        this.seguroSaludSecundario = seguroSaludSecundario;
    }

    public String getIdentificacionRepresentante() {
        return this.identificacionRepresentante;
    }

    public Paciente identificacionRepresentante(String identificacionRepresentante) {
        this.setIdentificacionRepresentante(identificacionRepresentante);
        return this;
    }

    public void setIdentificacionRepresentante(String identificacionRepresentante) {
        this.identificacionRepresentante = identificacionRepresentante;
    }

    public Discapacidad getDiscapacidad() {
        return this.discapacidad;
    }

    public void setDiscapacidad(Discapacidad discapacidad) {
        this.discapacidad = discapacidad;
        this.discapacidadId = discapacidad != null ? discapacidad.getId() : null;
    }

    public Paciente discapacidad(Discapacidad discapacidad) {
        this.setDiscapacidad(discapacidad);
        return this;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
        this.personaId = persona != null ? persona.getId() : null;
    }

    public Paciente persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public ParroquiaTerritorio getParroquiaNacimiento() {
        return this.parroquiaNacimiento;
    }

    public void setParroquiaNacimiento(ParroquiaTerritorio parroquiaTerritorio) {
        this.parroquiaNacimiento = parroquiaTerritorio;
        this.parroquiaNacimientoId = parroquiaTerritorio != null ? parroquiaTerritorio.getId() : null;
    }

    public Paciente parroquiaNacimiento(ParroquiaTerritorio parroquiaTerritorio) {
        this.setParroquiaNacimiento(parroquiaTerritorio);
        return this;
    }

    public ParroquiaTerritorio getParroquiaResidencia() {
        return this.parroquiaResidencia;
    }

    public void setParroquiaResidencia(ParroquiaTerritorio parroquiaTerritorio) {
        this.parroquiaResidencia = parroquiaTerritorio;
        this.parroquiaResidenciaId = parroquiaTerritorio != null ? parroquiaTerritorio.getId() : null;
    }

    public Paciente parroquiaResidencia(ParroquiaTerritorio parroquiaTerritorio) {
        this.setParroquiaResidencia(parroquiaTerritorio);
        return this;
    }

    public CatalogoItem getAutoidentificacionEtnica() {
        return this.autoidentificacionEtnica;
    }

    public void setAutoidentificacionEtnica(CatalogoItem catalogoItem) {
        this.autoidentificacionEtnica = catalogoItem;
        this.autoidentificacionEtnicaId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente autoidentificacionEtnica(CatalogoItem catalogoItem) {
        this.setAutoidentificacionEtnica(catalogoItem);
        return this;
    }

    public CatalogoItem getNacionalidadEtnica() {
        return this.nacionalidadEtnica;
    }

    public void setNacionalidadEtnica(CatalogoItem catalogoItem) {
        this.nacionalidadEtnica = catalogoItem;
        this.nacionalidadEtnicaId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente nacionalidadEtnica(CatalogoItem catalogoItem) {
        this.setNacionalidadEtnica(catalogoItem);
        return this;
    }

    public CatalogoItem getPueblo() {
        return this.pueblo;
    }

    public void setPueblo(CatalogoItem catalogoItem) {
        this.pueblo = catalogoItem;
        this.puebloId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente pueblo(CatalogoItem catalogoItem) {
        this.setPueblo(catalogoItem);
        return this;
    }

    public CatalogoItem getTipoEmpresaTrabajo() {
        return this.tipoEmpresaTrabajo;
    }

    public void setTipoEmpresaTrabajo(CatalogoItem catalogoItem) {
        this.tipoEmpresaTrabajo = catalogoItem;
        this.tipoEmpresaTrabajoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente tipoEmpresaTrabajo(CatalogoItem catalogoItem) {
        this.setTipoEmpresaTrabajo(catalogoItem);
        return this;
    }

    public CatalogoItem getProfesionOcupacion() {
        return this.profesionOcupacion;
    }

    public void setProfesionOcupacion(CatalogoItem catalogoItem) {
        this.profesionOcupacion = catalogoItem;
        this.profesionOcupacionId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente profesionOcupacion(CatalogoItem catalogoItem) {
        this.setProfesionOcupacion(catalogoItem);
        return this;
    }

    public CatalogoItem getSeguroSaludPrincipal() {
        return this.seguroSaludPrincipal;
    }

    public void setSeguroSaludPrincipal(CatalogoItem catalogoItem) {
        this.seguroSaludPrincipal = catalogoItem;
        this.seguroSaludPrincipalId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente seguroSaludPrincipal(CatalogoItem catalogoItem) {
        this.setSeguroSaludPrincipal(catalogoItem);
        return this;
    }

    public CatalogoItem getTipoBono() {
        return this.tipoBono;
    }

    public void setTipoBono(CatalogoItem catalogoItem) {
        this.tipoBono = catalogoItem;
        this.tipoBonoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente tipoBono(CatalogoItem catalogoItem) {
        this.setTipoBono(catalogoItem);
        return this;
    }

    public CatalogoItem getProcedenciaRepresentante() {
        return this.procedenciaRepresentante;
    }

    public void setProcedenciaRepresentante(CatalogoItem catalogoItem) {
        this.procedenciaRepresentante = catalogoItem;
        this.procedenciaRepresentanteId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Paciente procedenciaRepresentante(CatalogoItem catalogoItem) {
        this.setProcedenciaRepresentante(catalogoItem);
        return this;
    }

    public Long getDiscapacidadId() {
        return this.discapacidadId;
    }

    public void setDiscapacidadId(Long discapacidad) {
        this.discapacidadId = discapacidad;
    }

    public Long getPersonaId() {
        return this.personaId;
    }

    public void setPersonaId(Long persona) {
        this.personaId = persona;
    }

    public Long getParroquiaNacimientoId() {
        return this.parroquiaNacimientoId;
    }

    public void setParroquiaNacimientoId(Long parroquiaTerritorio) {
        this.parroquiaNacimientoId = parroquiaTerritorio;
    }

    public Long getParroquiaResidenciaId() {
        return this.parroquiaResidenciaId;
    }

    public void setParroquiaResidenciaId(Long parroquiaTerritorio) {
        this.parroquiaResidenciaId = parroquiaTerritorio;
    }

    public Long getAutoidentificacionEtnicaId() {
        return this.autoidentificacionEtnicaId;
    }

    public void setAutoidentificacionEtnicaId(Long catalogoItem) {
        this.autoidentificacionEtnicaId = catalogoItem;
    }

    public Long getNacionalidadEtnicaId() {
        return this.nacionalidadEtnicaId;
    }

    public void setNacionalidadEtnicaId(Long catalogoItem) {
        this.nacionalidadEtnicaId = catalogoItem;
    }

    public Long getPuebloId() {
        return this.puebloId;
    }

    public void setPuebloId(Long catalogoItem) {
        this.puebloId = catalogoItem;
    }

    public Long getTipoEmpresaTrabajoId() {
        return this.tipoEmpresaTrabajoId;
    }

    public void setTipoEmpresaTrabajoId(Long catalogoItem) {
        this.tipoEmpresaTrabajoId = catalogoItem;
    }

    public Long getProfesionOcupacionId() {
        return this.profesionOcupacionId;
    }

    public void setProfesionOcupacionId(Long catalogoItem) {
        this.profesionOcupacionId = catalogoItem;
    }

    public Long getSeguroSaludPrincipalId() {
        return this.seguroSaludPrincipalId;
    }

    public void setSeguroSaludPrincipalId(Long catalogoItem) {
        this.seguroSaludPrincipalId = catalogoItem;
    }

    public Long getTipoBonoId() {
        return this.tipoBonoId;
    }

    public void setTipoBonoId(Long catalogoItem) {
        this.tipoBonoId = catalogoItem;
    }

    public Long getProcedenciaRepresentanteId() {
        return this.procedenciaRepresentanteId;
    }

    public void setProcedenciaRepresentanteId(Long catalogoItem) {
        this.procedenciaRepresentanteId = catalogoItem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paciente)) {
            return false;
        }
        return getId() != null && getId().equals(((Paciente) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Paciente{" +
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
            "}";
    }
}
