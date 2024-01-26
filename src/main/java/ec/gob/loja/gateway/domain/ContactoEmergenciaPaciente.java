package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The ContactoEmergenciaPaciente entity.
 * @author Usuario
 */
@Table("contacto_emergencia_paciente")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContactoEmergenciaPaciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Column("nombre")
    private String nombre;

    /**
     * telefono
     */
    @Column("telefono")
    private String telefono;

    /**
     * direccion
     */
    @Column("direccion")
    private String direccion;

    @Transient
    @JsonIgnoreProperties(
        value = {
            "discapacidad",
            "persona",
            "parroquiaNacimiento",
            "parroquiaResidencia",
            "autoidentificacionEtnica",
            "nacionalidadEtnica",
            "pueblo",
            "tipoEmpresaTrabajo",
            "profesionOcupacion",
            "seguroSaludPrincipal",
            "tipoBono",
            "procedenciaRepresentante",
        },
        allowSetters = true
    )
    private Paciente paciente;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem parentezco;

    @Column("paciente_id")
    private Long pacienteId;

    @Column("parentezco_id")
    private Long parentezcoId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ContactoEmergenciaPaciente id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public ContactoEmergenciaPaciente nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return this.telefono;
    }

    public ContactoEmergenciaPaciente telefono(String telefono) {
        this.setTelefono(telefono);
        return this;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return this.direccion;
    }

    public ContactoEmergenciaPaciente direccion(String direccion) {
        this.setDireccion(direccion);
        return this;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Paciente getPaciente() {
        return this.paciente;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
        this.pacienteId = paciente != null ? paciente.getId() : null;
    }

    public ContactoEmergenciaPaciente paciente(Paciente paciente) {
        this.setPaciente(paciente);
        return this;
    }

    public CatalogoItem getParentezco() {
        return this.parentezco;
    }

    public void setParentezco(CatalogoItem catalogoItem) {
        this.parentezco = catalogoItem;
        this.parentezcoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public ContactoEmergenciaPaciente parentezco(CatalogoItem catalogoItem) {
        this.setParentezco(catalogoItem);
        return this;
    }

    public Long getPacienteId() {
        return this.pacienteId;
    }

    public void setPacienteId(Long paciente) {
        this.pacienteId = paciente;
    }

    public Long getParentezcoId() {
        return this.parentezcoId;
    }

    public void setParentezcoId(Long catalogoItem) {
        this.parentezcoId = catalogoItem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactoEmergenciaPaciente)) {
            return false;
        }
        return getId() != null && getId().equals(((ContactoEmergenciaPaciente) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContactoEmergenciaPaciente{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", direccion='" + getDireccion() + "'" +
            "}";
    }
}
