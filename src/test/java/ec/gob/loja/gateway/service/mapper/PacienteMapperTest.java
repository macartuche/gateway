package ec.gob.loja.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class PacienteMapperTest {

    private PacienteMapper pacienteMapper;

    @BeforeEach
    public void setUp() {
        pacienteMapper = new PacienteMapperImpl();
    }
}
