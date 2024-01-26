package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CatalogoItemTestSamples.*;
import static ec.gob.loja.gateway.domain.ContactoEmergenciaPacienteTestSamples.*;
import static ec.gob.loja.gateway.domain.PacienteTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ContactoEmergenciaPacienteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ContactoEmergenciaPaciente.class);
        ContactoEmergenciaPaciente contactoEmergenciaPaciente1 = getContactoEmergenciaPacienteSample1();
        ContactoEmergenciaPaciente contactoEmergenciaPaciente2 = new ContactoEmergenciaPaciente();
        assertThat(contactoEmergenciaPaciente1).isNotEqualTo(contactoEmergenciaPaciente2);

        contactoEmergenciaPaciente2.setId(contactoEmergenciaPaciente1.getId());
        assertThat(contactoEmergenciaPaciente1).isEqualTo(contactoEmergenciaPaciente2);

        contactoEmergenciaPaciente2 = getContactoEmergenciaPacienteSample2();
        assertThat(contactoEmergenciaPaciente1).isNotEqualTo(contactoEmergenciaPaciente2);
    }

    @Test
    void pacienteTest() throws Exception {
        ContactoEmergenciaPaciente contactoEmergenciaPaciente = getContactoEmergenciaPacienteRandomSampleGenerator();
        Paciente pacienteBack = getPacienteRandomSampleGenerator();

        contactoEmergenciaPaciente.setPaciente(pacienteBack);
        assertThat(contactoEmergenciaPaciente.getPaciente()).isEqualTo(pacienteBack);

        contactoEmergenciaPaciente.paciente(null);
        assertThat(contactoEmergenciaPaciente.getPaciente()).isNull();
    }

    @Test
    void parentezcoTest() throws Exception {
        ContactoEmergenciaPaciente contactoEmergenciaPaciente = getContactoEmergenciaPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        contactoEmergenciaPaciente.setParentezco(catalogoItemBack);
        assertThat(contactoEmergenciaPaciente.getParentezco()).isEqualTo(catalogoItemBack);

        contactoEmergenciaPaciente.parentezco(null);
        assertThat(contactoEmergenciaPaciente.getParentezco()).isNull();
    }
}
