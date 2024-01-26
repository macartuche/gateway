package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.RolFuncionalidad} entity.
 */
@Schema(description = "The RolFuncionalidad entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class RolFuncionalidadDTO implements Serializable {

    private Long id;

    /**
     * rol
     */
    @NotNull(message = "must not be null")
    @Schema(description = "rol", required = true)
    private String rol;

    /**
     * activo
     */
    @Schema(description = "activo")
    private Boolean activo;

    /**
     * prioridad
     */
    @NotNull(message = "must not be null")
    @Schema(description = "prioridad", required = true)
    private Integer prioridad;

    /**
     * Funcionalidad asignada a rol
     */
    @Schema(description = "Funcionalidad asignada a rol")
    private FuncionalidadDTO funcionalidad;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public Integer getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(Integer prioridad) {
        this.prioridad = prioridad;
    }

    public FuncionalidadDTO getFuncionalidad() {
        return funcionalidad;
    }

    public void setFuncionalidad(FuncionalidadDTO funcionalidad) {
        this.funcionalidad = funcionalidad;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof RolFuncionalidadDTO)) {
            return false;
        }

        RolFuncionalidadDTO rolFuncionalidadDTO = (RolFuncionalidadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, rolFuncionalidadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "RolFuncionalidadDTO{" +
            "id=" + getId() +
            ", rol='" + getRol() + "'" +
            ", activo='" + getActivo() + "'" +
            ", prioridad=" + getPrioridad() +
            ", funcionalidad=" + getFuncionalidad() +
            "}";
    }
}
