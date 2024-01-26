package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class FirmaDigitalDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(FirmaDigitalDTO.class);
        FirmaDigitalDTO firmaDigitalDTO1 = new FirmaDigitalDTO();
        firmaDigitalDTO1.setId(1L);
        FirmaDigitalDTO firmaDigitalDTO2 = new FirmaDigitalDTO();
        assertThat(firmaDigitalDTO1).isNotEqualTo(firmaDigitalDTO2);
        firmaDigitalDTO2.setId(firmaDigitalDTO1.getId());
        assertThat(firmaDigitalDTO1).isEqualTo(firmaDigitalDTO2);
        firmaDigitalDTO2.setId(2L);
        assertThat(firmaDigitalDTO1).isNotEqualTo(firmaDigitalDTO2);
        firmaDigitalDTO1.setId(null);
        assertThat(firmaDigitalDTO1).isNotEqualTo(firmaDigitalDTO2);
    }
}
