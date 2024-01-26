package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A ParroquiaTerritorio.
 */
@Table("parroquia_territorio")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParroquiaTerritorio implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * codigo
     */
    @NotNull(message = "must not be null")
    @Column("codigo")
    private String codigo;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Column("nombre")
    private String nombre;

    @Transient
    @JsonIgnoreProperties(value = { "provincia" }, allowSetters = true)
    private CantonTerritorio canton;

    @Column("canton_id")
    private Long cantonId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ParroquiaTerritorio id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public ParroquiaTerritorio codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public ParroquiaTerritorio nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public CantonTerritorio getCanton() {
        return this.canton;
    }

    public void setCanton(CantonTerritorio cantonTerritorio) {
        this.canton = cantonTerritorio;
        this.cantonId = cantonTerritorio != null ? cantonTerritorio.getId() : null;
    }

    public ParroquiaTerritorio canton(CantonTerritorio cantonTerritorio) {
        this.setCanton(cantonTerritorio);
        return this;
    }

    public Long getCantonId() {
        return this.cantonId;
    }

    public void setCantonId(Long cantonTerritorio) {
        this.cantonId = cantonTerritorio;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParroquiaTerritorio)) {
            return false;
        }
        return getId() != null && getId().equals(((ParroquiaTerritorio) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParroquiaTerritorio{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
