package ec.gob.loja.gateway.service.dto;

import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContactoEmergenciaPacienteDTOTest {

    @Test
    void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoEmergenciaPacienteDTO.class);
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO1 = new ContactoEmergenciaPacienteDTO();
        contactoEmergenciaPacienteDTO1.setId(1L);
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO2 = new ContactoEmergenciaPacienteDTO();
        assertThat(contactoEmergenciaPacienteDTO1).isNotEqualTo(contactoEmergenciaPacienteDTO2);
        contactoEmergenciaPacienteDTO2.setId(contactoEmergenciaPacienteDTO1.getId());
        assertThat(contactoEmergenciaPacienteDTO1).isEqualTo(contactoEmergenciaPacienteDTO2);
        contactoEmergenciaPacienteDTO2.setId(2L);
        assertThat(contactoEmergenciaPacienteDTO1).isNotEqualTo(contactoEmergenciaPacienteDTO2);
        contactoEmergenciaPacienteDTO1.setId(null);
        assertThat(contactoEmergenciaPacienteDTO1).isNotEqualTo(contactoEmergenciaPacienteDTO2);
    }
}
