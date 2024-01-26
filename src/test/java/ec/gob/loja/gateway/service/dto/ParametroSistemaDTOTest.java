package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ParametroSistemaDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ParametroSistemaDTO.class);
        ParametroSistemaDTO parametroSistemaDTO1 = new ParametroSistemaDTO();
        parametroSistemaDTO1.setId(1L);
        ParametroSistemaDTO parametroSistemaDTO2 = new ParametroSistemaDTO();
        assertThat(parametroSistemaDTO1).isNotEqualTo(parametroSistemaDTO2);
        parametroSistemaDTO2.setId(parametroSistemaDTO1.getId());
        assertThat(parametroSistemaDTO1).isEqualTo(parametroSistemaDTO2);
        parametroSistemaDTO2.setId(2L);
        assertThat(parametroSistemaDTO1).isNotEqualTo(parametroSistemaDTO2);
        parametroSistemaDTO1.setId(null);
        assertThat(parametroSistemaDTO1).isNotEqualTo(parametroSistemaDTO2);
    }
}
