package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CantonTerritorioDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CantonTerritorioDTO.class);
        CantonTerritorioDTO cantonTerritorioDTO1 = new CantonTerritorioDTO();
        cantonTerritorioDTO1.setId(1L);
        CantonTerritorioDTO cantonTerritorioDTO2 = new CantonTerritorioDTO();
        assertThat(cantonTerritorioDTO1).isNotEqualTo(cantonTerritorioDTO2);
        cantonTerritorioDTO2.setId(cantonTerritorioDTO1.getId());
        assertThat(cantonTerritorioDTO1).isEqualTo(cantonTerritorioDTO2);
        cantonTerritorioDTO2.setId(2L);
        assertThat(cantonTerritorioDTO1).isNotEqualTo(cantonTerritorioDTO2);
        cantonTerritorioDTO1.setId(null);
        assertThat(cantonTerritorioDTO1).isNotEqualTo(cantonTerritorioDTO2);
    }
}
