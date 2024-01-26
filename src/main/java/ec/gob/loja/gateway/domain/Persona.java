package ec.gob.loja.gateway.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

/**
 * The Persona entity.
 * @author Usuario
 */
@Table("persona")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Persona implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @Column("id")
    private Long id;

    /**
     * identificacion
     */
    @NotNull(message = "must not be null")
    @Column("identificacion")
    private String identificacion;

    /**
     * primer apellido
     */
    @NotNull(message = "must not be null")
    @Column("primer_apellido")
    private String primerApellido;

    /**
     * segundo apellido
     */
    @Column("segundo_apellido")
    private String segundoApellido;

    /**
     * primer Nombre
     */
    @NotNull(message = "must not be null")
    @Column("primer_nombre")
    private String primerNombre;

    /**
     * segundo Nombre
     */
    @Column("segundo_nombre")
    private String segundoNombre;

    /**
     * celular
     */
    @Column("celular")
    private String celular;

    /**
     * telefono convencional
     */
    @Column("telefono_convencional")
    private String telefonoConvencional;

    /**
     * correo
     */
    @Column("correo")
    private String correo;

    /**
     * Tipo de identificacion
     */
    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem tipoIdentificacion;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem nacionalidad;

    /**
     * Usuario asociado a persona
     */
    @Transient
    private User usuario;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem genero;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem estadoCivil;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem nivelEducacion;

    @Transient
    @JsonIgnoreProperties(value = { "catalogo" }, allowSetters = true)
    private CatalogoItem estadoNivelEducacion;

    @Column("tipo_identificacion_id")
    private Long tipoIdentificacionId;

    @Column("nacionalidad_id")
    private Long nacionalidadId;

    @Column("usuario_id")
    private Long usuarioId;

    @Column("genero_id")
    private Long generoId;

    @Column("estado_civil_id")
    private Long estadoCivilId;

    @Column("nivel_educacion_id")
    private Long nivelEducacionId;

    @Column("estado_nivel_educacion_id")
    private Long estadoNivelEducacionId;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Persona id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getIdentificacion() {
        return this.identificacion;
    }

    public Persona identificacion(String identificacion) {
        this.setIdentificacion(identificacion);
        return this;
    }

    public void setIdentificacion(String identificacion) {
        this.identificacion = identificacion;
    }

    public String getPrimerApellido() {
        return this.primerApellido;
    }

    public Persona primerApellido(String primerApellido) {
        this.setPrimerApellido(primerApellido);
        return this;
    }

    public void setPrimerApellido(String primerApellido) {
        this.primerApellido = primerApellido;
    }

    public String getSegundoApellido() {
        return this.segundoApellido;
    }

    public Persona segundoApellido(String segundoApellido) {
        this.setSegundoApellido(segundoApellido);
        return this;
    }

    public void setSegundoApellido(String segundoApellido) {
        this.segundoApellido = segundoApellido;
    }

    public String getPrimerNombre() {
        return this.primerNombre;
    }

    public Persona primerNombre(String primerNombre) {
        this.setPrimerNombre(primerNombre);
        return this;
    }

    public void setPrimerNombre(String primerNombre) {
        this.primerNombre = primerNombre;
    }

    public String getSegundoNombre() {
        return this.segundoNombre;
    }

    public Persona segundoNombre(String segundoNombre) {
        this.setSegundoNombre(segundoNombre);
        return this;
    }

    public void setSegundoNombre(String segundoNombre) {
        this.segundoNombre = segundoNombre;
    }

    public String getCelular() {
        return this.celular;
    }

    public Persona celular(String celular) {
        this.setCelular(celular);
        return this;
    }

    public void setCelular(String celular) {
        this.celular = celular;
    }

    public String getTelefonoConvencional() {
        return this.telefonoConvencional;
    }

    public Persona telefonoConvencional(String telefonoConvencional) {
        this.setTelefonoConvencional(telefonoConvencional);
        return this;
    }

    public void setTelefonoConvencional(String telefonoConvencional) {
        this.telefonoConvencional = telefonoConvencional;
    }

    public String getCorreo() {
        return this.correo;
    }

    public Persona correo(String correo) {
        this.setCorreo(correo);
        return this;
    }

    public void setCorreo(String correo) {
        this.correo = correo;
    }

    public CatalogoItem getTipoIdentificacion() {
        return this.tipoIdentificacion;
    }

    public void setTipoIdentificacion(CatalogoItem catalogoItem) {
        this.tipoIdentificacion = catalogoItem;
        this.tipoIdentificacionId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona tipoIdentificacion(CatalogoItem catalogoItem) {
        this.setTipoIdentificacion(catalogoItem);
        return this;
    }

    public CatalogoItem getNacionalidad() {
        return this.nacionalidad;
    }

    public void setNacionalidad(CatalogoItem catalogoItem) {
        this.nacionalidad = catalogoItem;
        this.nacionalidadId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona nacionalidad(CatalogoItem catalogoItem) {
        this.setNacionalidad(catalogoItem);
        return this;
    }

    public User getUsuario() {
        return this.usuario;
    }

    public void setUsuario(User user) {
        this.usuario = user;
        this.usuarioId = user != null ? user.getId() : null;
    }

    public Persona usuario(User user) {
        this.setUsuario(user);
        return this;
    }

    public CatalogoItem getGenero() {
        return this.genero;
    }

    public void setGenero(CatalogoItem catalogoItem) {
        this.genero = catalogoItem;
        this.generoId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona genero(CatalogoItem catalogoItem) {
        this.setGenero(catalogoItem);
        return this;
    }

    public CatalogoItem getEstadoCivil() {
        return this.estadoCivil;
    }

    public void setEstadoCivil(CatalogoItem catalogoItem) {
        this.estadoCivil = catalogoItem;
        this.estadoCivilId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona estadoCivil(CatalogoItem catalogoItem) {
        this.setEstadoCivil(catalogoItem);
        return this;
    }

    public CatalogoItem getNivelEducacion() {
        return this.nivelEducacion;
    }

    public void setNivelEducacion(CatalogoItem catalogoItem) {
        this.nivelEducacion = catalogoItem;
        this.nivelEducacionId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona nivelEducacion(CatalogoItem catalogoItem) {
        this.setNivelEducacion(catalogoItem);
        return this;
    }

    public CatalogoItem getEstadoNivelEducacion() {
        return this.estadoNivelEducacion;
    }

    public void setEstadoNivelEducacion(CatalogoItem catalogoItem) {
        this.estadoNivelEducacion = catalogoItem;
        this.estadoNivelEducacionId = catalogoItem != null ? catalogoItem.getId() : null;
    }

    public Persona estadoNivelEducacion(CatalogoItem catalogoItem) {
        this.setEstadoNivelEducacion(catalogoItem);
        return this;
    }

    public Long getTipoIdentificacionId() {
        return this.tipoIdentificacionId;
    }

    public void setTipoIdentificacionId(Long catalogoItem) {
        this.tipoIdentificacionId = catalogoItem;
    }

    public Long getNacionalidadId() {
        return this.nacionalidadId;
    }

    public void setNacionalidadId(Long catalogoItem) {
        this.nacionalidadId = catalogoItem;
    }

    public Long getUsuarioId() {
        return this.usuarioId;
    }

    public void setUsuarioId(Long user) {
        this.usuarioId = user;
    }

    public Long getGeneroId() {
        return this.generoId;
    }

    public void setGeneroId(Long catalogoItem) {
        this.generoId = catalogoItem;
    }

    public Long getEstadoCivilId() {
        return this.estadoCivilId;
    }

    public void setEstadoCivilId(Long catalogoItem) {
        this.estadoCivilId = catalogoItem;
    }

    public Long getNivelEducacionId() {
        return this.nivelEducacionId;
    }

    public void setNivelEducacionId(Long catalogoItem) {
        this.nivelEducacionId = catalogoItem;
    }

    public Long getEstadoNivelEducacionId() {
        return this.estadoNivelEducacionId;
    }

    public void setEstadoNivelEducacionId(Long catalogoItem) {
        this.estadoNivelEducacionId = catalogoItem;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Persona)) {
            return false;
        }
        return getId() != null && getId().equals(((Persona) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Persona{" +
            "id=" + getId() +
            ", identificacion='" + getIdentificacion() + "'" +
            ", primerApellido='" + getPrimerApellido() + "'" +
            ", segundoApellido='" + getSegundoApellido() + "'" +
            ", primerNombre='" + getPrimerNombre() + "'" +
            ", segundoNombre='" + getSegundoNombre() + "'" +
            ", celular='" + getCelular() + "'" +
            ", telefonoConvencional='" + getTelefonoConvencional() + "'" +
            ", correo='" + getCorreo() + "'" +
            "}";
    }
}
