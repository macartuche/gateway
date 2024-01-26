package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.CantonTerritorio} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CantonTerritorioDTO implements Serializable {

    private Long id;

    /**
     * codigo
     */
    @NotNull(message = "must not be null")
    @Schema(description = "codigo", required = true)
    private String codigo;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "nombre", required = true)
    private String nombre;

    private ProvinciaTerritorioDTO provincia;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return codigo;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public ProvinciaTerritorioDTO getProvincia() {
        return provincia;
    }

    public void setProvincia(ProvinciaTerritorioDTO provincia) {
        this.provincia = provincia;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CantonTerritorioDTO)) {
            return false;
        }

        CantonTerritorioDTO cantonTerritorioDTO = (CantonTerritorioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, cantonTerritorioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CantonTerritorioDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", provincia=" + getProvincia() +
            "}";
    }
}
