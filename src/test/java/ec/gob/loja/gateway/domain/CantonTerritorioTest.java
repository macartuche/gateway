package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CantonTerritorioTestSamples.*;
import static ec.gob.loja.gateway.domain.ProvinciaTerritorioTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CantonTerritorioTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CantonTerritorio.class);
        CantonTerritorio cantonTerritorio1 = getCantonTerritorioSample1();
        CantonTerritorio cantonTerritorio2 = new CantonTerritorio();
        assertThat(cantonTerritorio1).isNotEqualTo(cantonTerritorio2);

        cantonTerritorio2.setId(cantonTerritorio1.getId());
        assertThat(cantonTerritorio1).isEqualTo(cantonTerritorio2);

        cantonTerritorio2 = getCantonTerritorioSample2();
        assertThat(cantonTerritorio1).isNotEqualTo(cantonTerritorio2);
    }

    @Test
    void provinciaTest() throws Exception {
        CantonTerritorio cantonTerritorio = getCantonTerritorioRandomSampleGenerator();
        ProvinciaTerritorio provinciaTerritorioBack = getProvinciaTerritorioRandomSampleGenerator();

        cantonTerritorio.setProvincia(provinciaTerritorioBack);
        assertThat(cantonTerritorio.getProvincia()).isEqualTo(provinciaTerritorioBack);

        cantonTerritorio.provincia(null);
        assertThat(cantonTerritorio.getProvincia()).isNull();
    }
}
