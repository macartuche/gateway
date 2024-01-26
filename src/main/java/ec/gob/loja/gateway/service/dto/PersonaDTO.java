package ec.gob.loja.gateway.service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link ec.gob.loja.gateway.domain.Persona} entity.
 */
@Schema(description = "The Persona entity.\n@author Usuario")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PersonaDTO implements Serializable {

    private Long id;

    /**
     * identificacion
     */
    @NotNull(message = "must not be null")
    @Schema(description = "identificacion", required = true)
    private String identificacion;

    /**
     * primer apellido
     */
    @NotNull(message = "must not be null")
    @Schema(description = "primer apellido", required = true)
    private String primerApellido;

    /**
     * segundo apellido
     */
    @Schema(description = "segundo apellido")
    private String segundoApellido;

    /**
     * primer Nombre
     */
    @NotNull(message = "must not be null")
    @Schema(description = "primer Nombre", required = true)
    private String primerNombre;

    /**
     * segundo Nombre
     */
    @Schema(description = "segundo Nombre")
    private String segundoNombre;

    /**
     * celular
     */
    @Schema(description = "celular")
    private String celular;

    /**
     * telefono convencional
     */
    @Schema(description = "telefono convencional")
    private String telefonoConvencional;

    /**
     * correo
     */
    @Schema(description = "correo")
    private String correo;

    /**
     * Tipo de identificacion
     */
    @Schema(description = "Tipo de identificacion")
    private CatalogoItemDTO tipoIdentificacion;

    private CatalogoItemDTO nacionalidad;

    /**
     * Usuario asociado a persona
     */
    @Schema(description = "Usuario asociado a persona")
    private UserDTO usuario;

    private CatalogoItemDTO genero;

    private CatalogoItemDTO estadoCivil;

    private CatalogoItemDTO nivelEducacion;

    private CatalogoItemDTO estadoNivelEducacion;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacion() {
        return identificacion;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getPrimerApellido() {
        return primerApellido;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return segundoApellido;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getPrimerNombre() {
        return primerNombre;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return segundoNombre;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getCelular() {
        return celular;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getTelefonoConvencional() {
        return telefonoConvencional;
    }

    public void setTelefonoConvencional(String telefonoConvencional) {
        this.telefonoConvencional = telefonoConvencional;
    }

    public String getCorreo() {
        return correo;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public CatalogoItemDTO getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public void setTipoIdentificacion(CatalogoItemDTO tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public CatalogoItemDTO getNacionalidad() {
        return nacionalidad;
    }

    public void setNacionalidad(CatalogoItemDTO nacionalidad) {
        this.nacionalidad = nacionalidad;
    }

    public UserDTO getUsuario() {
        return usuario;
    }

    public void setUsuario(UserDTO usuario) {
        this.usuario = usuario;
    }

    public CatalogoItemDTO getGenero() {
        return genero;
    }

    public void setGenero(CatalogoItemDTO genero) {
        this.genero = genero;
    }

    public CatalogoItemDTO getEstadoCivil() {
        return estadoCivil;
    }

    public void setEstadoCivil(CatalogoItemDTO estadoCivil) {
        this.estadoCivil = estadoCivil;
    }

    public CatalogoItemDTO getNivelEducacion() {
        return nivelEducacion;
    }

    public void setNivelEducacion(CatalogoItemDTO nivelEducacion) {
        this.nivelEducacion = nivelEducacion;
    }

    public CatalogoItemDTO getEstadoNivelEducacion() {
        return estadoNivelEducacion;
    }

    public void setEstadoNivelEducacion(CatalogoItemDTO estadoNivelEducacion) {
        this.estadoNivelEducacion = estadoNivelEducacion;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PersonaDTO)) {
            return false;
        }

        PersonaDTO personaDTO = (PersonaDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, personaDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PersonaDTO{" +
            "id=" + getId() +
            ", identificacion='" + getIdentificacion() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", primerNombre='" + getPrimerNombre() + "'" +
            ", segundoNombre='" + getSegundoNombre() + "'" +
            ", celular='" + getCelular() + "'" +
            ", telefonoConvencional='" + getTelefonoConvencional() + "'" +
            ", correo='" + getCorreo() + "'" +
            ", tipoIdentificacion=" + getTipoIdentificacion() +
            ", nacionalidad=" + getNacionalidad() +
            ", usuario=" + getUsuario() +
            ", genero=" + getGenero() +
            ", estadoCivil=" + getEstadoCivil() +
            ", nivelEducacion=" + getNivelEducacion() +
            ", estadoNivelEducacion=" + getEstadoNivelEducacion() +
            "}";
    }
}
