package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.ProvinciaTerritorioTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProvinciaTerritorioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProvinciaTerritorio.class);
        ProvinciaTerritorio provinciaTerritorio1 = getProvinciaTerritorioSample1();
        ProvinciaTerritorio provinciaTerritorio2 = new ProvinciaTerritorio();
        assertThat(provinciaTerritorio1).isNotEqualTo(provinciaTerritorio2);

        provinciaTerritorio2.setId(provinciaTerritorio1.getId());
        assertThat(provinciaTerritorio1).isEqualTo(provinciaTerritorio2);

        provinciaTerritorio2 = getProvinciaTerritorioSample2();
        assertThat(provinciaTerritorio1).isNotEqualTo(provinciaTerritorio2);
    }
}
