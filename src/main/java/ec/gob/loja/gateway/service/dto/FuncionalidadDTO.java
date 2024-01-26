package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.Funcionalidad} entity.
 */
@Schema(description = "The Funcionalidad entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class FuncionalidadDTO implements Serializable {

    private Long id;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "nombre", required = true)
    private String nombre;

    /**
     * descripcion
     */
    @Schema(description = "descripcion")
    private String descripcion;

    /**
     * url
     */
    @Size(max = 80)
    @Schema(description = "url")
    private String url;

    /**
     * activo
     */
    @NotNull(message = "must not be null")
    @Schema(description = "activo", required = true)
    private Boolean activo;

    /**
     * icono menu
     */
    @Schema(description = "icono menu")
    private String icono;

    /**
     * visible
     */
    @Schema(description = "visible")
    private Boolean visible;

    private FuncionalidadDTO padre;

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

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public FuncionalidadDTO getPadre() {
        return padre;
    }

    public void setPadre(FuncionalidadDTO padre) {
        this.padre = padre;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FuncionalidadDTO)) {
            return false;
        }

        FuncionalidadDTO funcionalidadDTO = (FuncionalidadDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, funcionalidadDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FuncionalidadDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", url='" + getUrl() + "'" +
            ", activo='" + getActivo() + "'" +
            ", icono='" + getIcono() + "'" +
            ", visible='" + getVisible() + "'" +
            ", padre=" + getPadre() +
            "}";
    }
}
