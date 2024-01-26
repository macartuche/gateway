package ec.gob.loja.gateway.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * A CantonTerritorio.
 */
@Table("canton_territorio")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CantonTerritorio implements Serializable {

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
    private ProvinciaTerritorio provincia;

    @Column("provincia_id")
    private Long provinciaId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CantonTerritorio id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public CantonTerritorio codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return this.nombre;
    }

    public CantonTerritorio nombre(String nombre) {
        this.setNombre(nombre);
        return this;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ProvinciaTerritorio getProvincia() {
        return this.provincia;
    }

    public void setProvincia(ProvinciaTerritorio provinciaTerritorio) {
        this.provincia = provinciaTerritorio;
        this.provinciaId = provinciaTerritorio != null ? provinciaTerritorio.getId() : null;
    }

    public CantonTerritorio provincia(ProvinciaTerritorio provinciaTerritorio) {
        this.setProvincia(provinciaTerritorio);
        return this;
    }

    public Long getProvinciaId() {
        return this.provinciaId;
    }

    public void setProvinciaId(Long provinciaTerritorio) {
        this.provinciaId = provinciaTerritorio;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CantonTerritorio)) {
            return false;
        }
        return getId() != null && getId().equals(((CantonTerritorio) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CantonTerritorio{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            "}";
    }
}
