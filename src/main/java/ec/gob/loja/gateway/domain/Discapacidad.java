package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The Discapacidad entity.
 * @author Usuario
 */
@Table("discapacidad")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Discapacidad implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * porcentaje
     */
    @NotNull(message = "must not be null")
    @Column("porcentaje")
    private BigDecimal porcentaje;

    /**
     * Tipo de discapacidad
     */
    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipo;

    /**
     * Estado de registro de discapacidad
     */
    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem estado;

    @Column("tipo_id")
    private Long tipoId;

    @Column("estado_id")
    private Long estadoId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Discapacidad id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPorcentaje() {
        return this.porcentaje;
    }

    public Discapacidad porcentaje(BigDecimal porcentaje) {
        this.setPorcentaje(porcentaje);
        return this;
    }

    public void setPorcentaje(BigDecimal porcentaje) {
        this.porcentaje = porcentaje != null ? porcentaje.stripTrailingZeros() : null;
    }

    public CatalogoItem getTipo() {
        return this.tipo;
    }

    public void setTipo(CatalogoItem catalogoItem) {
        this.tipo = catalogoItem;
        this.tipoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Discapacidad tipo(CatalogoItem catalogoItem) {
        this.setTipo(catalogoItem);
        return this;
    }

    public CatalogoItem getEstado() {
        return this.estado;
    }

    public void setEstado(CatalogoItem catalogoItem) {
        this.estado = catalogoItem;
        this.estadoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Discapacidad estado(CatalogoItem catalogoItem) {
        this.setEstado(catalogoItem);
        return this;
    }

    public Long getTipoId() {
        return this.tipoId;
    }

    public void setTipoId(Long catalogoItem) {
        this.tipoId = catalogoItem;
    }

    public Long getEstadoId() {
        return this.estadoId;
    }

    public void setEstadoId(Long catalogoItem) {
        this.estadoId = catalogoItem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Discapacidad)) {
            return false;
        }
        return getId() != null && getId().equals(((Discapacidad) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Discapacidad{" +
            "id=" + getId() +
            ", porcentaje=" + getPorcentaje() +
            "}";
    }
}
