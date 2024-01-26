package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.ProvinciaTerritorio} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ProvinciaTerritorioDTO implements Serializable {

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

    /**
     * pais
     */
    @NotNull(message = "must not be null")
    @Schema(description = "pais", required = true)
    private String pais;

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

    public String getPais() {
        return pais;
    }

    public void setPais(String pais) {
        this.pais = pais;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ProvinciaTerritorioDTO)) {
            return false;
        }

        ProvinciaTerritorioDTO provinciaTerritorioDTO = (ProvinciaTerritorioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, provinciaTerritorioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ProvinciaTerritorioDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", pais='" + getPais() + "'" +
            "}";
    }
}
