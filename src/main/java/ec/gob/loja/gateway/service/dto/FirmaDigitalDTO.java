package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.FirmaDigital} entity.
 */
@Schema(description = "The FirmaDigital entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FirmaDigitalDTO implements Serializable {

    private Long id;

    /**
     * fechaDesde
     */
    @NotNull(message = "must not be null")
    @Schema(description = "fechaDesde", required = true)
    private LocalDate fechaDesde;

    /**
     * fechaHasta
     */
    @NotNull(message = "must not be null")
    @Schema(description = "fechaHasta", required = true)
    private LocalDate fechaHasta;

    /**
     * path
     */
    @Schema(description = "path")
    private String path;

    private CatalogoItemDTO tipo;

    private PersonaDTO persona;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getFechaDesde() {
        return fechaDesde;
    }

    public void setFechaDesde(LocalDate fechaDesde) {
        this.fechaDesde = fechaDesde;
    }

    public LocalDate getFechaHasta() {
        return fechaHasta;
    }

    public void setFechaHasta(LocalDate fechaHasta) {
        this.fechaHasta = fechaHasta;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public CatalogoItemDTO getTipo() {
        return tipo;
    }

    public void setTipo(CatalogoItemDTO tipo) {
        this.tipo = tipo;
    }

    public PersonaDTO getPersona() {
        return persona;
    }

    public void setPersona(PersonaDTO persona) {
        this.persona = persona;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FirmaDigitalDTO)) {
            return false;
        }

        FirmaDigitalDTO firmaDigitalDTO = (FirmaDigitalDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, firmaDigitalDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FirmaDigitalDTO{" +
            "id=" + getId() +
            ", fechaDesde='" + getFechaDesde() + "'" +
            ", fechaHasta='" + getFechaHasta() + "'" +
            ", path='" + getPath() + "'" +
            ", tipo=" + getTipo() +
            ", persona=" + getPersona() +
            "}";
    }
}
