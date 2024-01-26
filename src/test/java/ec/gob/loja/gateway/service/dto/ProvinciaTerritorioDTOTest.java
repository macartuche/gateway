package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProvinciaTerritorioDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProvinciaTerritorioDTO.class);
        ProvinciaTerritorioDTO provinciaTerritorioDTO1 = new ProvinciaTerritorioDTO();
        provinciaTerritorioDTO1.setId(1L);
        ProvinciaTerritorioDTO provinciaTerritorioDTO2 = new ProvinciaTerritorioDTO();
        assertThat(provinciaTerritorioDTO1).isNotEqualTo(provinciaTerritorioDTO2);
        provinciaTerritorioDTO2.setId(provinciaTerritorioDTO1.getId());
        assertThat(provinciaTerritorioDTO1).isEqualTo(provinciaTerritorioDTO2);
        provinciaTerritorioDTO2.setId(2L);
        assertThat(provinciaTerritorioDTO1).isNotEqualTo(provinciaTerritorioDTO2);
        provinciaTerritorioDTO1.setId(null);
        assertThat(provinciaTerritorioDTO1).isNotEqualTo(provinciaTerritorioDTO2);
    }
}
