package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.CatalogoItem} entity.
 */
@Schema(description = "The CatalogoItem entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CatalogoItemDTO implements Serializable {

    private Long id;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "nombre", required = true)
    private String nombre;

    /**
     * codigo
     */
    @NotNull(message = "must not be null")
    @Schema(description = "codigo", required = true)
    private String codigo;

    /**
     * descripcion
     */
    @Schema(description = "descripcion")
    private String descripcion;

    /**
     * catalogo Codigo
     */
    @NotNull(message = "must not be null")
    @Schema(description = "catalogo Codigo", required = true)
    private String catalogoCodigo;

    /**
     * activo
     */
    @Schema(description = "activo")
    private Boolean activo;

    private CatalogoDTO catalogo;

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

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getCatalogoCodigo() {
        return catalogoCodigo;
    }

    public void setCatalogoCodigo(String catalogoCodigo) {
        this.catalogoCodigo = catalogoCodigo;
    }

    public Boolean getActivo() {
        return activo;
    }

    public void setActivo(Boolean activo) {
        this.activo = activo;
    }

    public CatalogoDTO getCatalogo() {
        return catalogo;
    }

    public void setCatalogo(CatalogoDTO catalogo) {
        this.catalogo = catalogo;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CatalogoItemDTO)) {
            return false;
        }

        CatalogoItemDTO catalogoItemDTO = (CatalogoItemDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, catalogoItemDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CatalogoItemDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", catalogoCodigo='" + getCatalogoCodigo() + "'" +
            ", activo='" + getActivo() + "'" +
            ", catalogo=" + getCatalogo() +
            "}";
    }
}
