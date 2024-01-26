package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CatalogoItemTestSamples.*;
import static ec.gob.loja.gateway.domain.DiscapacidadTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DiscapacidadTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Discapacidad.class);
        Discapacidad discapacidad1 = getDiscapacidadSample1();
        Discapacidad discapacidad2 = new Discapacidad();
        assertThat(discapacidad1).isNotEqualTo(discapacidad2);

        discapacidad2.setId(discapacidad1.getId());
        assertThat(discapacidad1).isEqualTo(discapacidad2);

        discapacidad2 = getDiscapacidadSample2();
        assertThat(discapacidad1).isNotEqualTo(discapacidad2);
    }

    @Test
    void tipoTest() throws Exception {
        Discapacidad discapacidad = getDiscapacidadRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        discapacidad.setTipo(catalogoItemBack);
        assertThat(discapacidad.getTipo()).isEqualTo(catalogoItemBack);

        discapacidad.tipo(null);
        assertThat(discapacidad.getTipo()).isNull();
    }

    @Test
    void estadoTest() throws Exception {
        Discapacidad discapacidad = getDiscapacidadRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        discapacidad.setEstado(catalogoItemBack);
        assertThat(discapacidad.getEstado()).isEqualTo(catalogoItemBack);

        discapacidad.estado(null);
        assertThat(discapacidad.getEstado()).isNull();
    }
}
