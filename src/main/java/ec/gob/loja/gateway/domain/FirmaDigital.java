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
 * The FirmaDigital entity.
 * @author Usuario
 */
@Table("firma_digital")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FirmaDigital implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * fechaDesde
     */
    @NotNull(message = "must not be null")
    @Column("fecha_desde")
    private LocalDate fechaDesde;

    /**
     * fechaHasta
     */
    @NotNull(message = "must not be null")
    @Column("fecha_hasta")
    private LocalDate fechaHasta;

    /**
     * path
     */
    @Column("path")
    private String path;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipo;

    @Transient
    @JsonIgnoreProperties(
        value = { "tipoIdentificacion", "nacionalidad", "usuario", "genero", "estadoCivil", "nivelEducacion", "estadoNivelEducacion" },
        allowSetters = true
    )
    private Persona persona;

    @Column("tipo_id")
    private Long tipoId;

    @Column("persona_id")
    private Long personaId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public FirmaDigital id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaDesde() {
        return this.fechaDesde;
    }

    public FirmaDigital fechaDesde(LocalDate fechaDesde) {
        this.setFechaDesde(fechaDesde);
        return this;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return this.fechaHasta;
    }

    public FirmaDigital fechaHasta(LocalDate fechaHasta) {
        this.setFechaHasta(fechaHasta);
        return this;
    }

    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public String getPath() {
        return this.path;
    }

    public FirmaDigital path(String path) {
        this.setPath(path);
        return this;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public CatalogoItem getTipo() {
        return this.tipo;
    }

    public void setTipo(CatalogoItem catalogoItem) {
        this.tipo = catalogoItem;
        this.tipoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public FirmaDigital tipo(CatalogoItem catalogoItem) {
        this.setTipo(catalogoItem);
        return this;
    }

    public Persona getPersona() {
        return this.persona;
    }

    public void setPersona(Persona persona) {
        this.persona = persona;
        this.personaId = persona != null ? persona.getId() : null;
    }

    public FirmaDigital persona(Persona persona) {
        this.setPersona(persona);
        return this;
    }

    public Long getTipoId() {
        return this.tipoId;
    }

    public void setTipoId(Long catalogoItem) {
        this.tipoId = catalogoItem;
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
        if (!(o instanceof FirmaDigital)) {
            return false;
        }
        return getId() != null && getId().equals(((FirmaDigital) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FirmaDigital{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            ", path='" + getPath() + "'" +
            "}";
    }
}
