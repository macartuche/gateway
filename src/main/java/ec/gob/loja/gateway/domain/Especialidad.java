package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The Especialidad entity.
 * @author Usuario
 */
@Table("especialidad")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Especialidad implements Serializable {

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
     * activa
     */
    @NotNull(message = "must not be null")
    @Column("activa")
    private Boolean activa;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipo;

    @Column("tipo_id")
    private Long tipoId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Especialidad id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return this.nombre;
    }

    public Especialidad nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean getActiva() {
        return this.activa;
    }

    public Especialidad activa(Boolean activa) {
        this.setActiva(activa);
        return this;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public CatalogoItem getTipo() {
        return this.tipo;
    }

    public void setTipo(CatalogoItem catalogoItem) {
        this.tipo = catalogoItem;
        this.tipoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Especialidad tipo(CatalogoItem catalogoItem) {
        this.setTipo(catalogoItem);
        return this;
    }

    public Long getTipoId() {
        return this.tipoId;
    }

    public void setTipoId(Long catalogoItem) {
        this.tipoId = catalogoItem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Especialidad)) {
            return false;
        }
        return getId() != null && getId().equals(((Especialidad) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Especialidad{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", activa='" + getActiva() + "'" +
            "}";
    }
}
