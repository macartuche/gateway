package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.DoctorTestSamples.*;
import static ec.gob.loja.gateway.domain.PersonaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class DoctorTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Doctor.class);
        Doctor doctor1 = getDoctorSample1();
        Doctor doctor2 = new Doctor();
        assertThat(doctor1).isNotEqualTo(doctor2);

        doctor2.setId(doctor1.getId());
        assertThat(doctor1).isEqualTo(doctor2);

        doctor2 = getDoctorSample2();
        assertThat(doctor1).isNotEqualTo(doctor2);
    }

    @Test
    void personaTest() throws Exception {
        Doctor doctor = getDoctorRandomSampleGenerator();
        Persona personaBack = getPersonaRandomSampleGenerator();

        doctor.setPersona(personaBack);
        assertThat(doctor.getPersona()).isEqualTo(personaBack);

        doctor.persona(null);
        assertThat(doctor.getPersona()).isNull();
    }
}
