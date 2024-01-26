package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.ParametroSistema} entity.
 */
@Schema(description = "The ParametroSistema entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ParametroSistemaDTO implements Serializable {

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
     * clase de java
     */
    @NotNull(message = "must not be null")
    @Schema(description = "clase de java", required = true)
    private String clase;

    /**
     * valor
     */
    @NotNull(message = "must not be null")
    @Schema(description = "valor", required = true)
    private String valor;

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

    public String getClase() {
        return clase;
    }

    public void setClase(String clase) {
        this.clase = clase;
    }

    public String getValor() {
        return valor;
    }

    public void setValor(String valor) {
        this.valor = valor;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ParametroSistemaDTO)) {
            return false;
        }

        ParametroSistemaDTO parametroSistemaDTO = (ParametroSistemaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, parametroSistemaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ParametroSistemaDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", codigo='" + getCodigo() + "'" +
            ", clase='" + getClase() + "'" +
            ", valor='" + getValor() + "'" +
            "}";
    }
}
