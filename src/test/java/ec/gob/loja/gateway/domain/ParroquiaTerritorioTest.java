package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CantonTerritorioTestSamples.*;
import static ec.gob.loja.gateway.domain.ParroquiaTerritorioTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParroquiaTerritorioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParroquiaTerritorio.class);
        ParroquiaTerritorio parroquiaTerritorio1 = getParroquiaTerritorioSample1();
        ParroquiaTerritorio parroquiaTerritorio2 = new ParroquiaTerritorio();
        assertThat(parroquiaTerritorio1).isNotEqualTo(parroquiaTerritorio2);

        parroquiaTerritorio2.setId(parroquiaTerritorio1.getId());
        assertThat(parroquiaTerritorio1).isEqualTo(parroquiaTerritorio2);

        parroquiaTerritorio2 = getParroquiaTerritorioSample2();
        assertThat(parroquiaTerritorio1).isNotEqualTo(parroquiaTerritorio2);
    }

    @Test
    void cantonTest() throws Exception {
        ParroquiaTerritorio parroquiaTerritorio = getParroquiaTerritorioRandomSampleGenerator();
        CantonTerritorio cantonTerritorioBack = getCantonTerritorioRandomSampleGenerator();

        parroquiaTerritorio.setCanton(cantonTerritorioBack);
        assertThat(parroquiaTerritorio.getCanton()).isEqualTo(cantonTerritorioBack);

        parroquiaTerritorio.canton(null);
        assertThat(parroquiaTerritorio.getCanton()).isNull();
    }
}
