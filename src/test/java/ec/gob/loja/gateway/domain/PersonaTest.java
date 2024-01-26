package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CatalogoItemTestSamples.*;
import static ec.gob.loja.gateway.domain.PersonaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PersonaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Persona.class);
        Persona persona1 = getPersonaSample1();
        Persona persona2 = new Persona();
        assertThat(persona1).isNotEqualTo(persona2);

        persona2.setId(persona1.getId());
        assertThat(persona1).isEqualTo(persona2);

        persona2 = getPersonaSample2();
        assertThat(persona1).isNotEqualTo(persona2);
    }

    @Test
    void tipoIdentificacionTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setTipoIdentificacion(catalogoItemBack);
        assertThat(persona.getTipoIdentificacion()).isEqualTo(catalogoItemBack);

        persona.tipoIdentificacion(null);
        assertThat(persona.getTipoIdentificacion()).isNull();
    }

    @Test
    void nacionalidadTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setNacionalidad(catalogoItemBack);
        assertThat(persona.getNacionalidad()).isEqualTo(catalogoItemBack);

        persona.nacionalidad(null);
        assertThat(persona.getNacionalidad()).isNull();
    }

    @Test
    void generoTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setGenero(catalogoItemBack);
        assertThat(persona.getGenero()).isEqualTo(catalogoItemBack);

        persona.genero(null);
        assertThat(persona.getGenero()).isNull();
    }

    @Test
    void estadoCivilTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setEstadoCivil(catalogoItemBack);
        assertThat(persona.getEstadoCivil()).isEqualTo(catalogoItemBack);

        persona.estadoCivil(null);
        assertThat(persona.getEstadoCivil()).isNull();
    }

    @Test
    void nivelEducacionTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setNivelEducacion(catalogoItemBack);
        assertThat(persona.getNivelEducacion()).isEqualTo(catalogoItemBack);

        persona.nivelEducacion(null);
        assertThat(persona.getNivelEducacion()).isNull();
    }

    @Test
    void estadoNivelEducacionTest() throws Exception {
        Persona persona = getPersonaRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        persona.setEstadoNivelEducacion(catalogoItemBack);
        assertThat(persona.getEstadoNivelEducacion()).isEqualTo(catalogoItemBack);

        persona.estadoNivelEducacion(null);
        assertThat(persona.getEstadoNivelEducacion()).isNull();
    }
}
