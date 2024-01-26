package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParroquiaTerritorioDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParroquiaTerritorioDTO.class);
        ParroquiaTerritorioDTO parroquiaTerritorioDTO1 = new ParroquiaTerritorioDTO();
        parroquiaTerritorioDTO1.setId(1L);
        ParroquiaTerritorioDTO parroquiaTerritorioDTO2 = new ParroquiaTerritorioDTO();
        assertThat(parroquiaTerritorioDTO1).isNotEqualTo(parroquiaTerritorioDTO2);
        parroquiaTerritorioDTO2.setId(parroquiaTerritorioDTO1.getId());
        assertThat(parroquiaTerritorioDTO1).isEqualTo(parroquiaTerritorioDTO2);
        parroquiaTerritorioDTO2.setId(2L);
        assertThat(parroquiaTerritorioDTO1).isNotEqualTo(parroquiaTerritorioDTO2);
        parroquiaTerritorioDTO1.setId(null);
        assertThat(parroquiaTerritorioDTO1).isNotEqualTo(parroquiaTerritorioDTO2);
    }
}
