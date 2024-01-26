package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.Especialidad} entity.
 */
@Schema(description = "The Especialidad entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EspecialidadDTO implements Serializable {

    private Long id;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "nombre", required = true)
    private String nombre;

    /**
     * activa
     */
    @NotNull(message = "must not be null")
    @Schema(description = "activa", required = true)
    private Boolean activa;

    private CatalogoItemDTO tipo;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public Boolean getActiva() {
        return activa;
    }

    public void setActiva(Boolean activa) {
        this.activa = activa;
    }

    public CatalogoItemDTO getTipo() {
        return tipo;
    }

    public void setTipo(CatalogoItemDTO tipo) {
        this.tipo = tipo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EspecialidadDTO)) {
            return false;
        }

        EspecialidadDTO especialidadDTO = (EspecialidadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, especialidadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EspecialidadDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", activa='" + getActiva() + "'" +
            ", tipo=" + getTipo() +
            "}";
    }
}
