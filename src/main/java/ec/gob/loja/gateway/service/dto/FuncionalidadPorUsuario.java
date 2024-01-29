package ec.gob.loja.gateway.service.dto;

import java.util.ArrayList;
import java.util.List;

/**
 * A DTO for functionality by user authenticated response.
 */
public class FuncionalidadPorUsuario {

    private String nombre;

    private String icono;

    private String url;

    private Boolean visible;

    private List<FuncionalidadPorUsuario> hijos = new ArrayList<>();

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

    public Boolean getVisible() {
        return visible;
    }

    public void setVisible(Boolean visible) {
        this.visible = visible;
    }

    public List<FuncionalidadPorUsuario> getHijos() {
        return hijos;
    }

    public void setHijos(List<FuncionalidadPorUsuario> hijos) {
        this.hijos = hijos;
    }

    public void agregarHijo(FuncionalidadPorUsuario hijo) {
        this.hijos.add(hijo);
    }

    @Override
    public String toString() {
        return (
            "FuncionalidadPorUsuario [nombre=" +
            nombre +
            ", icono=" +
            icono +
            ", url=" +
            url +
            ", visible=" +
            visible +
            ", hijos=" +
            hijos +
            "]"
        );
    }
}
