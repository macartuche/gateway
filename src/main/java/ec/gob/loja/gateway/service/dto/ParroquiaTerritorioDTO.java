package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.ParroquiaTerritorio} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParroquiaTerritorioDTO implements Serializable {

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

    private CantonTerritorioDTO canton;

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

    public CantonTerritorioDTO getCanton() {
        return canton;
    }

    public void setCanton(CantonTerritorioDTO canton) {
        this.canton = canton;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParroquiaTerritorioDTO)) {
            return false;
        }

        ParroquiaTerritorioDTO parroquiaTerritorioDTO = (ParroquiaTerritorioDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, parroquiaTerritorioDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParroquiaTerritorioDTO{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", nombre='" + getNombre() + "'" +
            ", canton=" + getCanton() +
            "}";
    }
}
