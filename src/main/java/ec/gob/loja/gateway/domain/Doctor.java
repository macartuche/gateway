package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The Doctor entity.
 * @author Usuario
 */
@Table("doctor")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Doctor implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * codigo
     */
    @Column("codigo")
    private String codigo;

    /**
     * activo
     */
    @Column("activo")
    private Boolean activo;

    @Transient
    @JsonIgnoreProperties(
        value = { "tipoIdentificacion", "nacionalidad", "usuario", "genero", "estadoCivil", "nivelEducacion", "estadoNivelEducacion" },
        allowSetters = true
    )
    private Persona persona;

    @Column("persona_id")
    private Long personaId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Doctor id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Doctor codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Boolean getActivo() {
        return this.activo;
    }

    public Doctor activo(Boolean activo) {
        this.setActivo(activo);
        return this;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
        this.personaId = persona != null ? persona.getId() : null;
    }

    public Doctor persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public Long getPersonaId() {
        return this.personaId;
    }

    public void setPersonaId(Long persona) {
        this.personaId = persona;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Doctor)) {
            return false;
        }
        return getId() != null && getId().equals(((Doctor) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Doctor{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", activo='" + getActivo() + "'" +
            "}";
    }
}
