package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CatalogoItemDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(CatalogoItemDTO.class);
        CatalogoItemDTO catalogoItemDTO1 = new CatalogoItemDTO();
        catalogoItemDTO1.setId(1L);
        CatalogoItemDTO catalogoItemDTO2 = new CatalogoItemDTO();
        assertThat(catalogoItemDTO1).isNotEqualTo(catalogoItemDTO2);
        catalogoItemDTO2.setId(catalogoItemDTO1.getId());
        assertThat(catalogoItemDTO1).isEqualTo(catalogoItemDTO2);
        catalogoItemDTO2.setId(2L);
        assertThat(catalogoItemDTO1).isNotEqualTo(catalogoItemDTO2);
        catalogoItemDTO1.setId(null);
        assertThat(catalogoItemDTO1).isNotEqualTo(catalogoItemDTO2);
    }
}
