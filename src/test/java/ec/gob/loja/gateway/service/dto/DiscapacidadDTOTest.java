package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DiscapacidadDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DiscapacidadDTO.class);
        DiscapacidadDTO discapacidadDTO1 = new DiscapacidadDTO();
        discapacidadDTO1.setId(1L);
        DiscapacidadDTO discapacidadDTO2 = new DiscapacidadDTO();
        assertThat(discapacidadDTO1).isNotEqualTo(discapacidadDTO2);
        discapacidadDTO2.setId(discapacidadDTO1.getId());
        assertThat(discapacidadDTO1).isEqualTo(discapacidadDTO2);
        discapacidadDTO2.setId(2L);
        assertThat(discapacidadDTO1).isNotEqualTo(discapacidadDTO2);
        discapacidadDTO1.setId(null);
        assertThat(discapacidadDTO1).isNotEqualTo(discapacidadDTO2);
    }
}
