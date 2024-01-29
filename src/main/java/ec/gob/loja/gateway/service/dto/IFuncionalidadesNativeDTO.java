package ec.gob.loja.gateway.service.dto;

public class IFuncionalidadesNativeDTO {

    private Long id;
    private String nombre;
    private String icono;
    private String url;
    private Integer prioridad;
    private Long padreid;
    private Boolean visible;

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

    public String getIcono() {
        return icono;
    }

    public void setIcono(String icono) {
        this.icono = icono;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getPrioridad() {
        return prioridad;
    }

    public void setPrioridad(Integer prioridad) {
        this.prioridad = prioridad;
    }

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    @Override
    public String toString() {
        return (
            "IFuncionalidadesNativeDTO [id=" +
            id +
            ", nombre=" +
            nombre +
            ", icono=" +
            icono +
            ", url=" +
            url +
            ", prioridad=" +
            prioridad +
            ", padreid=" +
            padreid +
            ", visible=" +
            visible +
            "]"
        );
    }

    public Long getPadreid() {
        return padreid;
    }

    public void setPadreid(Long padreid) {
        this.padreid = padreid;
    }
    /*
    Long getId();
    String getNombre();
    String getIcono();
    String getUrl();
    Integer getPrioridad();
    Long getPadreId();
    Boolean getVisible();
     */
}
