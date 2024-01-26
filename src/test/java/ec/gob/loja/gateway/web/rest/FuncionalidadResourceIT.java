package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.Funcionalidad;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.FuncionalidadRepository;
import ec.gob.loja.gateway.service.dto.FuncionalidadDTO;
import ec.gob.loja.gateway.service.mapper.FuncionalidadMapper;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;

/**
 * Integration tests for the {@link FuncionalidadResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class FuncionalidadResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final String DEFAULT_URL = "AAAAAAAAAA";
    private static final String UPDATED_URL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final String DEFAULT_ICONO = "AAAAAAAAAA";
    private static final String UPDATED_ICONO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_VISIBLE = false;
    private static final Boolean UPDATED_VISIBLE = true;

    private static final String ENTITY_API_URL = "/api/funcionalidads";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FuncionalidadRepository funcionalidadRepository;

    @Autowired
    private FuncionalidadMapper funcionalidadMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Funcionalidad funcionalidad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Funcionalidad createEntity(EntityManager em) {
        Funcionalidad funcionalidad = new Funcionalidad()
            .nombre(DEFAULT_NOMBRE)
            .descripcion(DEFAULT_DESCRIPCION)
            .url(DEFAULT_URL)
            .activo(DEFAULT_ACTIVO)
            .icono(DEFAULT_ICONO)
            .visible(DEFAULT_VISIBLE);
        return funcionalidad;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Funcionalidad createUpdatedEntity(EntityManager em) {
        Funcionalidad funcionalidad = new Funcionalidad()
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .url(UPDATED_URL)
            .activo(UPDATED_ACTIVO)
            .icono(UPDATED_ICONO)
            .visible(UPDATED_VISIBLE);
        return funcionalidad;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Funcionalidad.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        funcionalidad = createEntity(em);
    }

    @Test
    void createFuncionalidad() throws Exception {
        int databaseSizeBeforeCreate = funcionalidadRepository.findAll().collectList().block().size();
        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeCreate + 1);
        Funcionalidad testFuncionalidad = funcionalidadList.get(funcionalidadList.size() - 1);
        assertThat(testFuncionalidad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testFuncionalidad.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testFuncionalidad.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testFuncionalidad.getActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testFuncionalidad.getIcono()).isEqualTo(DEFAULT_ICONO);
        assertThat(testFuncionalidad.getVisible()).isEqualTo(DEFAULT_VISIBLE);
    }

    @Test
    void createFuncionalidadWithExistingId() throws Exception {
        // Create the Funcionalidad with an existing ID
        funcionalidad.setId(1L);
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        int databaseSizeBeforeCreate = funcionalidadRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = funcionalidadRepository.findAll().collectList().block().size();
        // set the field null
        funcionalidad.setNombre(null);

        // Create the Funcionalidad, which fails.
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkActivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = funcionalidadRepository.findAll().collectList().block().size();
        // set the field null
        funcionalidad.setActivo(null);

        // Create the Funcionalidad, which fails.
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllFuncionalidads() {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        // Get all the funcionalidadList
        webTestClient
            .get()
            .uri(ENTITY_API_URL + "?sort=id,desc")
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.[*].id")
            .value(hasItem(funcionalidad.getId().intValue()))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE))
            .jsonPath("$.[*].descripcion")
            .value(hasItem(DEFAULT_DESCRIPCION))
            .jsonPath("$.[*].url")
            .value(hasItem(DEFAULT_URL))
            .jsonPath("$.[*].activo")
            .value(hasItem(DEFAULT_ACTIVO.booleanValue()))
            .jsonPath("$.[*].icono")
            .value(hasItem(DEFAULT_ICONO))
            .jsonPath("$.[*].visible")
            .value(hasItem(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    void getFuncionalidad() {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        // Get the funcionalidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, funcionalidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(funcionalidad.getId().intValue()))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE))
            .jsonPath("$.descripcion")
            .value(is(DEFAULT_DESCRIPCION))
            .jsonPath("$.url")
            .value(is(DEFAULT_URL))
            .jsonPath("$.activo")
            .value(is(DEFAULT_ACTIVO.booleanValue()))
            .jsonPath("$.icono")
            .value(is(DEFAULT_ICONO))
            .jsonPath("$.visible")
            .value(is(DEFAULT_VISIBLE.booleanValue()));
    }

    @Test
    void getNonExistingFuncionalidad() {
        // Get the funcionalidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingFuncionalidad() throws Exception {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();

        // Update the funcionalidad
        Funcionalidad updatedFuncionalidad = funcionalidadRepository.findById(funcionalidad.getId()).block();
        updatedFuncionalidad
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .url(UPDATED_URL)
            .activo(UPDATED_ACTIVO)
            .icono(UPDATED_ICONO)
            .visible(UPDATED_VISIBLE);
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(updatedFuncionalidad);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, funcionalidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
        Funcionalidad testFuncionalidad = funcionalidadList.get(funcionalidadList.size() - 1);
        assertThat(testFuncionalidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testFuncionalidad.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFuncionalidad.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testFuncionalidad.getActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testFuncionalidad.getIcono()).isEqualTo(UPDATED_ICONO);
        assertThat(testFuncionalidad.getVisible()).isEqualTo(UPDATED_VISIBLE);
    }

    @Test
    void putNonExistingFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, funcionalidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFuncionalidadWithPatch() throws Exception {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();

        // Update the funcionalidad using partial update
        Funcionalidad partialUpdatedFuncionalidad = new Funcionalidad();
        partialUpdatedFuncionalidad.setId(funcionalidad.getId());

        partialUpdatedFuncionalidad.nombre(UPDATED_NOMBRE).icono(UPDATED_ICONO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFuncionalidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFuncionalidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
        Funcionalidad testFuncionalidad = funcionalidadList.get(funcionalidadList.size() - 1);
        assertThat(testFuncionalidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testFuncionalidad.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testFuncionalidad.getUrl()).isEqualTo(DEFAULT_URL);
        assertThat(testFuncionalidad.getActivo()).isEqualTo(DEFAULT_ACTIVO);
        assertThat(testFuncionalidad.getIcono()).isEqualTo(UPDATED_ICONO);
        assertThat(testFuncionalidad.getVisible()).isEqualTo(DEFAULT_VISIBLE);
    }

    @Test
    void fullUpdateFuncionalidadWithPatch() throws Exception {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();

        // Update the funcionalidad using partial update
        Funcionalidad partialUpdatedFuncionalidad = new Funcionalidad();
        partialUpdatedFuncionalidad.setId(funcionalidad.getId());

        partialUpdatedFuncionalidad
            .nombre(UPDATED_NOMBRE)
            .descripcion(UPDATED_DESCRIPCION)
            .url(UPDATED_URL)
            .activo(UPDATED_ACTIVO)
            .icono(UPDATED_ICONO)
            .visible(UPDATED_VISIBLE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFuncionalidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFuncionalidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
        Funcionalidad testFuncionalidad = funcionalidadList.get(funcionalidadList.size() - 1);
        assertThat(testFuncionalidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testFuncionalidad.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testFuncionalidad.getUrl()).isEqualTo(UPDATED_URL);
        assertThat(testFuncionalidad.getActivo()).isEqualTo(UPDATED_ACTIVO);
        assertThat(testFuncionalidad.getIcono()).isEqualTo(UPDATED_ICONO);
        assertThat(testFuncionalidad.getVisible()).isEqualTo(UPDATED_VISIBLE);
    }

    @Test
    void patchNonExistingFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, funcionalidadDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFuncionalidad() throws Exception {
        int databaseSizeBeforeUpdate = funcionalidadRepository.findAll().collectList().block().size();
        funcionalidad.setId(longCount.incrementAndGet());

        // Create the Funcionalidad
        FuncionalidadDTO funcionalidadDTO = funcionalidadMapper.toDto(funcionalidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(funcionalidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Funcionalidad in the database
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFuncionalidad() {
        // Initialize the database
        funcionalidadRepository.save(funcionalidad).block();

        int databaseSizeBeforeDelete = funcionalidadRepository.findAll().collectList().block().size();

        // Delete the funcionalidad
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, funcionalidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Funcionalidad> funcionalidadList = funcionalidadRepository.findAll().collectList().block();
        assertThat(funcionalidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
