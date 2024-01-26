package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CatalogoItemTestSamples.*;
import static ec.gob.loja.gateway.domain.FirmaDigitalTestSamples.*;
import static ec.gob.loja.gateway.domain.PersonaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FirmaDigitalTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FirmaDigital.class);
        FirmaDigital firmaDigital1 = getFirmaDigitalSample1();
        FirmaDigital firmaDigital2 = new FirmaDigital();
        assertThat(firmaDigital1).isNotEqualTo(firmaDigital2);

        firmaDigital2.setId(firmaDigital1.getId());
        assertThat(firmaDigital1).isEqualTo(firmaDigital2);

        firmaDigital2 = getFirmaDigitalSample2();
        assertThat(firmaDigital1).isNotEqualTo(firmaDigital2);
    }

    @Test
    void tipoTest() throws Exception {
        FirmaDigital firmaDigital = getFirmaDigitalRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        firmaDigital.setTipo(catalogoItemBack);
        assertThat(firmaDigital.getTipo()).isEqualTo(catalogoItemBack);

        firmaDigital.tipo(null);
        assertThat(firmaDigital.getTipo()).isNull();
    }

    @Test
    void personaTest() throws Exception {
        FirmaDigital firmaDigital = getFirmaDigitalRandomSampleGenerator();
        Persona personaBack = getPersonaRandomSampleGenerator();

        firmaDigital.setPersona(personaBack);
        assertThat(firmaDigital.getPersona()).isEqualTo(personaBack);

        firmaDigital.persona(null);
        assertThat(firmaDigital.getPersona()).isNull();
    }
}
