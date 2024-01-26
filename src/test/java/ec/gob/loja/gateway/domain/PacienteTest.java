package ec.gob.loja.gateway.domain;

import static ec.gob.loja.gateway.domain.CatalogoItemTestSamples.*;
import static ec.gob.loja.gateway.domain.DiscapacidadTestSamples.*;
import static ec.gob.loja.gateway.domain.PacienteTestSamples.*;
import static ec.gob.loja.gateway.domain.ParroquiaTerritorioTestSamples.*;
import static ec.gob.loja.gateway.domain.PersonaTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import ec.gob.loja.gateway.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PacienteTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Paciente.class);
        Paciente paciente1 = getPacienteSample1();
        Paciente paciente2 = new Paciente();
        assertThat(paciente1).isNotEqualTo(paciente2);

        paciente2.setId(paciente1.getId());
        assertThat(paciente1).isEqualTo(paciente2);

        paciente2 = getPacienteSample2();
        assertThat(paciente1).isNotEqualTo(paciente2);
    }

    @Test
    void discapacidadTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        Discapacidad discapacidadBack = getDiscapacidadRandomSampleGenerator();

        paciente.setDiscapacidad(discapacidadBack);
        assertThat(paciente.getDiscapacidad()).isEqualTo(discapacidadBack);

        paciente.discapacidad(null);
        assertThat(paciente.getDiscapacidad()).isNull();
    }

    @Test
    void personaTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        Persona personaBack = getPersonaRandomSampleGenerator();

        paciente.setPersona(personaBack);
        assertThat(paciente.getPersona()).isEqualTo(personaBack);

        paciente.persona(null);
        assertThat(paciente.getPersona()).isNull();
    }

    @Test
    void parroquiaNacimientoTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        ParroquiaTerritorio parroquiaTerritorioBack = getParroquiaTerritorioRandomSampleGenerator();

        paciente.setParroquiaNacimiento(parroquiaTerritorioBack);
        assertThat(paciente.getParroquiaNacimiento()).isEqualTo(parroquiaTerritorioBack);

        paciente.parroquiaNacimiento(null);
        assertThat(paciente.getParroquiaNacimiento()).isNull();
    }

    @Test
    void parroquiaResidenciaTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        ParroquiaTerritorio parroquiaTerritorioBack = getParroquiaTerritorioRandomSampleGenerator();

        paciente.setParroquiaResidencia(parroquiaTerritorioBack);
        assertThat(paciente.getParroquiaResidencia()).isEqualTo(parroquiaTerritorioBack);

        paciente.parroquiaResidencia(null);
        assertThat(paciente.getParroquiaResidencia()).isNull();
    }

    @Test
    void autoidentificacionEtnicaTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setAutoidentificacionEtnica(catalogoItemBack);
        assertThat(paciente.getAutoidentificacionEtnica()).isEqualTo(catalogoItemBack);

        paciente.autoidentificacionEtnica(null);
        assertThat(paciente.getAutoidentificacionEtnica()).isNull();
    }

    @Test
    void nacionalidadEtnicaTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setNacionalidadEtnica(catalogoItemBack);
        assertThat(paciente.getNacionalidadEtnica()).isEqualTo(catalogoItemBack);

        paciente.nacionalidadEtnica(null);
        assertThat(paciente.getNacionalidadEtnica()).isNull();
    }

    @Test
    void puebloTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setPueblo(catalogoItemBack);
        assertThat(paciente.getPueblo()).isEqualTo(catalogoItemBack);

        paciente.pueblo(null);
        assertThat(paciente.getPueblo()).isNull();
    }

    @Test
    void tipoEmpresaTrabajoTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setTipoEmpresaTrabajo(catalogoItemBack);
        assertThat(paciente.getTipoEmpresaTrabajo()).isEqualTo(catalogoItemBack);

        paciente.tipoEmpresaTrabajo(null);
        assertThat(paciente.getTipoEmpresaTrabajo()).isNull();
    }

    @Test
    void profesionOcupacionTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setProfesionOcupacion(catalogoItemBack);
        assertThat(paciente.getProfesionOcupacion()).isEqualTo(catalogoItemBack);

        paciente.profesionOcupacion(null);
        assertThat(paciente.getProfesionOcupacion()).isNull();
    }

    @Test
    void seguroSaludPrincipalTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setSeguroSaludPrincipal(catalogoItemBack);
        assertThat(paciente.getSeguroSaludPrincipal()).isEqualTo(catalogoItemBack);

        paciente.seguroSaludPrincipal(null);
        assertThat(paciente.getSeguroSaludPrincipal()).isNull();
    }

    @Test
    void tipoBonoTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setTipoBono(catalogoItemBack);
        assertThat(paciente.getTipoBono()).isEqualTo(catalogoItemBack);

        paciente.tipoBono(null);
        assertThat(paciente.getTipoBono()).isNull();
    }

    @Test
    void procedenciaRepresentanteTest() throws Exception {
        Paciente paciente = getPacienteRandomSampleGenerator();
        CatalogoItem catalogoItemBack = getCatalogoItemRandomSampleGenerator();

        paciente.setProcedenciaRepresentante(catalogoItemBack);
        assertThat(paciente.getProcedenciaRepresentante()).isEqualTo(catalogoItemBack);

        paciente.procedenciaRepresentante(null);
        assertThat(paciente.getProcedenciaRepresentante()).isNull();
    }
}
