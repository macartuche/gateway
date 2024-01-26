package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente} entity.
 */
@Schema(description = "The ContactoEmergenciaPaciente entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ContactoEmergenciaPacienteDTO implements Serializable {

    private Long id;

    /**
     * nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "nombre", required = true)
    private String nombre;

    /**
     * telefono
     */
    @Schema(description = "telefono")
    private String telefono;

    /**
     * direccion
     */
    @Schema(description = "direccion")
    private String direccion;

    private PacienteDTO paciente;

    private CatalogoItemDTO parentezco;

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

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public PacienteDTO getPaciente() {
        return paciente;
    }

    public void setPaciente(PacienteDTO paciente) {
        this.paciente = paciente;
    }

    public CatalogoItemDTO getParentezco() {
        return parentezco;
    }

    public void setParentezco(CatalogoItemDTO parentezco) {
        this.parentezco = parentezco;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ContactoEmergenciaPacienteDTO)) {
            return false;
        }

        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = (ContactoEmergenciaPacienteDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, contactoEmergenciaPacienteDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ContactoEmergenciaPacienteDTO{" +
            "id=" + getId() +
            ", nombre='" + getNombre() + "'" +
            ", telefono='" + getTelefono() + "'" +
            ", direccion='" + getDireccion() + "'" +
            ", paciente=" + getPaciente() +
            ", parentezco=" + getParentezco() +
            "}";
    }
}
