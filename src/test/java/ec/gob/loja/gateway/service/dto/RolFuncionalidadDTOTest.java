package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RolFuncionalidadDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RolFuncionalidadDTO.class);
        RolFuncionalidadDTO rolFuncionalidadDTO1 = new RolFuncionalidadDTO();
        rolFuncionalidadDTO1.setId(1L);
        RolFuncionalidadDTO rolFuncionalidadDTO2 = new RolFuncionalidadDTO();
        assertThat(rolFuncionalidadDTO1).isNotEqualTo(rolFuncionalidadDTO2);
        rolFuncionalidadDTO2.setId(rolFuncionalidadDTO1.getId());
        assertThat(rolFuncionalidadDTO1).isEqualTo(rolFuncionalidadDTO2);
        rolFuncionalidadDTO2.setId(2L);
        assertThat(rolFuncionalidadDTO1).isNotEqualTo(rolFuncionalidadDTO2);
        rolFuncionalidadDTO1.setId(null);
        assertThat(rolFuncionalidadDTO1).isNotEqualTo(rolFuncionalidadDTO2);
    }
}
