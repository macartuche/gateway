package ec.gob.loja.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class PersonaMapperTest {

    private PersonaMapper personaMapper;

    @BeforeEach
    public void setUp() {
        personaMapper = new PersonaMapperImpl();
    }
}
