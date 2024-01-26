package ec.gob.loja.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class CatalogoItemMapperTest {

    private CatalogoItemMapper catalogoItemMapper;

    @BeforeEach
    public void setUp() {
        catalogoItemMapper = new CatalogoItemMapperImpl();
    }
}
