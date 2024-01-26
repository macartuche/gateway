package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.Discapacidad} entity.
 */
@Schema(description = "The Discapacidad entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DiscapacidadDTO implements Serializable {

    private Long id;

    /**
     * porcentaje
     */
    @NotNull(message = "must not be null")
    @Schema(description = "porcentaje", required = true)
    private BigDecimal porcentaje;

    /**
     * Tipo de discapacidad
     */
    @Schema(description = "Tipo de discapacidad")
    private CatalogoItemDTO tipo;

    /**
     * Estado de registro de discapacidad
     */
    @Schema(description = "Estado de registro de discapacidad")
    private CatalogoItemDTO estado;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getPorcentaje() {
        return porcentaje;
    }

    public void setPorcentaje(BigDecimal porcentaje) {
        this.porcentaje = porcentaje;
    }

    public CatalogoItemDTO getTipo() {
        return tipo;
    }

    public void setTipo(CatalogoItemDTO tipo) {
        this.tipo = tipo;
    }

    public CatalogoItemDTO getEstado() {
        return estado;
    }

    public void setEstado(CatalogoItemDTO estado) {
        this.estado = estado;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DiscapacidadDTO)) {
            return false;
        }

        DiscapacidadDTO discapacidadDTO = (DiscapacidadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, discapacidadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DiscapacidadDTO{" +
            "id=" + getId() +
            ", porcentaje=" + getPorcentaje() +
            ", tipo=" + getTipo() +
            ", estado=" + getEstado() +
            "}";
    }
}
