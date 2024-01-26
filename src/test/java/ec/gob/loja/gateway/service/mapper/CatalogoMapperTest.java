package ec.gob.loja.gateway.service.mapper;

import org.junit.jupiter.api.BeforeEach;

class CatalogoMapperTest {

    private CatalogoMapper catalogoMapper;

    @BeforeEach
    public void setUp() {
        catalogoMapper = new CatalogoMapperImpl();
    }
}
