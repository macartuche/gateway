package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.ProvinciaTerritorio;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.ProvinciaTerritorioRepository;
import ec.gob.loja.gateway.service.dto.ProvinciaTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.ProvinciaTerritorioMapper;
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
 * Integration tests for the {@link ProvinciaTerritorioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ProvinciaTerritorioResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_PAIS = "AAAAAAAAAA";
    private static final String UPDATED_PAIS = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/provincia-territorios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ProvinciaTerritorioRepository provinciaTerritorioRepository;

    @Autowired
    private ProvinciaTerritorioMapper provinciaTerritorioMapper;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private ProvinciaTerritorio provinciaTerritorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProvinciaTerritorio createEntity(EntityManager em) {
        ProvinciaTerritorio provinciaTerritorio = new ProvinciaTerritorio()
            .codigo(DEFAULT_CODIGO)
            .nombre(DEFAULT_NOMBRE)
            .pais(DEFAULT_PAIS);
        return provinciaTerritorio;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProvinciaTerritorio createUpdatedEntity(EntityManager em) {
        ProvinciaTerritorio provinciaTerritorio = new ProvinciaTerritorio()
            .codigo(UPDATED_CODIGO)
            .nombre(UPDATED_NOMBRE)
            .pais(UPDATED_PAIS);
        return provinciaTerritorio;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(ProvinciaTerritorio.class).block();
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
        provinciaTerritorio = createEntity(em);
    }

    @Test
    void createProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeCreate = provinciaTerritorioRepository.findAll().collectList().block().size();
        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeCreate + 1);
        ProvinciaTerritorio testProvinciaTerritorio = provinciaTerritorioList.get(provinciaTerritorioList.size() - 1);
        assertThat(testProvinciaTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testProvinciaTerritorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProvinciaTerritorio.getPais()).isEqualTo(DEFAULT_PAIS);
    }

    @Test
    void createProvinciaTerritorioWithExistingId() throws Exception {
        // Create the ProvinciaTerritorio with an existing ID
        provinciaTerritorio.setId(1L);
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        int databaseSizeBeforeCreate = provinciaTerritorioRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = provinciaTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        provinciaTerritorio.setCodigo(null);

        // Create the ProvinciaTerritorio, which fails.
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = provinciaTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        provinciaTerritorio.setNombre(null);

        // Create the ProvinciaTerritorio, which fails.
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkPaisIsRequired() throws Exception {
        int databaseSizeBeforeTest = provinciaTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        provinciaTerritorio.setPais(null);

        // Create the ProvinciaTerritorio, which fails.
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllProvinciaTerritorios() {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        // Get all the provinciaTerritorioList
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
            .value(hasItem(provinciaTerritorio.getId().intValue()))
            .jsonPath("$.[*].codigo")
            .value(hasItem(DEFAULT_CODIGO))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE))
            .jsonPath("$.[*].pais")
            .value(hasItem(DEFAULT_PAIS));
    }

    @Test
    void getProvinciaTerritorio() {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        // Get the provinciaTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, provinciaTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(provinciaTerritorio.getId().intValue()))
            .jsonPath("$.codigo")
            .value(is(DEFAULT_CODIGO))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE))
            .jsonPath("$.pais")
            .value(is(DEFAULT_PAIS));
    }

    @Test
    void getNonExistingProvinciaTerritorio() {
        // Get the provinciaTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingProvinciaTerritorio() throws Exception {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();

        // Update the provinciaTerritorio
        ProvinciaTerritorio updatedProvinciaTerritorio = provinciaTerritorioRepository.findById(provinciaTerritorio.getId()).block();
        updatedProvinciaTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE).pais(UPDATED_PAIS);
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(updatedProvinciaTerritorio);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, provinciaTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ProvinciaTerritorio testProvinciaTerritorio = provinciaTerritorioList.get(provinciaTerritorioList.size() - 1);
        assertThat(testProvinciaTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testProvinciaTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProvinciaTerritorio.getPais()).isEqualTo(UPDATED_PAIS);
    }

    @Test
    void putNonExistingProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, provinciaTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateProvinciaTerritorioWithPatch() throws Exception {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();

        // Update the provinciaTerritorio using partial update
        ProvinciaTerritorio partialUpdatedProvinciaTerritorio = new ProvinciaTerritorio();
        partialUpdatedProvinciaTerritorio.setId(provinciaTerritorio.getId());

        partialUpdatedProvinciaTerritorio.pais(UPDATED_PAIS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedProvinciaTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedProvinciaTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ProvinciaTerritorio testProvinciaTerritorio = provinciaTerritorioList.get(provinciaTerritorioList.size() - 1);
        assertThat(testProvinciaTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testProvinciaTerritorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testProvinciaTerritorio.getPais()).isEqualTo(UPDATED_PAIS);
    }

    @Test
    void fullUpdateProvinciaTerritorioWithPatch() throws Exception {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();

        // Update the provinciaTerritorio using partial update
        ProvinciaTerritorio partialUpdatedProvinciaTerritorio = new ProvinciaTerritorio();
        partialUpdatedProvinciaTerritorio.setId(provinciaTerritorio.getId());

        partialUpdatedProvinciaTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE).pais(UPDATED_PAIS);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedProvinciaTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedProvinciaTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ProvinciaTerritorio testProvinciaTerritorio = provinciaTerritorioList.get(provinciaTerritorioList.size() - 1);
        assertThat(testProvinciaTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testProvinciaTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testProvinciaTerritorio.getPais()).isEqualTo(UPDATED_PAIS);
    }

    @Test
    void patchNonExistingProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, provinciaTerritorioDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamProvinciaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = provinciaTerritorioRepository.findAll().collectList().block().size();
        provinciaTerritorio.setId(longCount.incrementAndGet());

        // Create the ProvinciaTerritorio
        ProvinciaTerritorioDTO provinciaTerritorioDTO = provinciaTerritorioMapper.toDto(provinciaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(provinciaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ProvinciaTerritorio in the database
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteProvinciaTerritorio() {
        // Initialize the database
        provinciaTerritorioRepository.save(provinciaTerritorio).block();

        int databaseSizeBeforeDelete = provinciaTerritorioRepository.findAll().collectList().block().size();

        // Delete the provinciaTerritorio
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, provinciaTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<ProvinciaTerritorio> provinciaTerritorioList = provinciaTerritorioRepository.findAll().collectList().block();
        assertThat(provinciaTerritorioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
