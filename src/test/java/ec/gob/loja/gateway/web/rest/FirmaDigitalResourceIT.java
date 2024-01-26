package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.FirmaDigital;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.FirmaDigitalRepository;
import ec.gob.loja.gateway.service.FirmaDigitalService;
import ec.gob.loja.gateway.service.dto.FirmaDigitalDTO;
import ec.gob.loja.gateway.service.mapper.FirmaDigitalMapper;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.reactive.server.WebTestClient;
import reactor.core.publisher.Flux;

/**
 * Integration tests for the {@link FirmaDigitalResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class FirmaDigitalResourceIT {

    private static final LocalDate DEFAULT_FECHA_DESDE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_DESDE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_HASTA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_HASTA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_PATH = "AAAAAAAAAA";
    private static final String UPDATED_PATH = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/firma-digitals";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private FirmaDigitalRepository firmaDigitalRepository;

    @Mock
    private FirmaDigitalRepository firmaDigitalRepositoryMock;

    @Autowired
    private FirmaDigitalMapper firmaDigitalMapper;

    @Mock
    private FirmaDigitalService firmaDigitalServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private FirmaDigital firmaDigital;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FirmaDigital createEntity(EntityManager em) {
        FirmaDigital firmaDigital = new FirmaDigital().fechaDesde(DEFAULT_FECHA_DESDE).fechaHasta(DEFAULT_FECHA_HASTA).path(DEFAULT_PATH);
        return firmaDigital;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FirmaDigital createUpdatedEntity(EntityManager em) {
        FirmaDigital firmaDigital = new FirmaDigital().fechaDesde(UPDATED_FECHA_DESDE).fechaHasta(UPDATED_FECHA_HASTA).path(UPDATED_PATH);
        return firmaDigital;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(FirmaDigital.class).block();
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
        firmaDigital = createEntity(em);
    }

    @Test
    void createFirmaDigital() throws Exception {
        int databaseSizeBeforeCreate = firmaDigitalRepository.findAll().collectList().block().size();
        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeCreate + 1);
        FirmaDigital testFirmaDigital = firmaDigitalList.get(firmaDigitalList.size() - 1);
        assertThat(testFirmaDigital.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testFirmaDigital.getFechaHasta()).isEqualTo(DEFAULT_FECHA_HASTA);
        assertThat(testFirmaDigital.getPath()).isEqualTo(DEFAULT_PATH);
    }

    @Test
    void createFirmaDigitalWithExistingId() throws Exception {
        // Create the FirmaDigital with an existing ID
        firmaDigital.setId(1L);
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        int databaseSizeBeforeCreate = firmaDigitalRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkFechaDesdeIsRequired() throws Exception {
        int databaseSizeBeforeTest = firmaDigitalRepository.findAll().collectList().block().size();
        // set the field null
        firmaDigital.setFechaDesde(null);

        // Create the FirmaDigital, which fails.
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkFechaHastaIsRequired() throws Exception {
        int databaseSizeBeforeTest = firmaDigitalRepository.findAll().collectList().block().size();
        // set the field null
        firmaDigital.setFechaHasta(null);

        // Create the FirmaDigital, which fails.
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllFirmaDigitals() {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        // Get all the firmaDigitalList
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
            .value(hasItem(firmaDigital.getId().intValue()))
            .jsonPath("$.[*].fechaDesde")
            .value(hasItem(DEFAULT_FECHA_DESDE.toString()))
            .jsonPath("$.[*].fechaHasta")
            .value(hasItem(DEFAULT_FECHA_HASTA.toString()))
            .jsonPath("$.[*].path")
            .value(hasItem(DEFAULT_PATH));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFirmaDigitalsWithEagerRelationshipsIsEnabled() {
        when(firmaDigitalServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(firmaDigitalServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllFirmaDigitalsWithEagerRelationshipsIsNotEnabled() {
        when(firmaDigitalServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(firmaDigitalRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getFirmaDigital() {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        // Get the firmaDigital
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, firmaDigital.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(firmaDigital.getId().intValue()))
            .jsonPath("$.fechaDesde")
            .value(is(DEFAULT_FECHA_DESDE.toString()))
            .jsonPath("$.fechaHasta")
            .value(is(DEFAULT_FECHA_HASTA.toString()))
            .jsonPath("$.path")
            .value(is(DEFAULT_PATH));
    }

    @Test
    void getNonExistingFirmaDigital() {
        // Get the firmaDigital
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingFirmaDigital() throws Exception {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();

        // Update the firmaDigital
        FirmaDigital updatedFirmaDigital = firmaDigitalRepository.findById(firmaDigital.getId()).block();
        updatedFirmaDigital.fechaDesde(UPDATED_FECHA_DESDE).fechaHasta(UPDATED_FECHA_HASTA).path(UPDATED_PATH);
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(updatedFirmaDigital);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, firmaDigitalDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
        FirmaDigital testFirmaDigital = firmaDigitalList.get(firmaDigitalList.size() - 1);
        assertThat(testFirmaDigital.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testFirmaDigital.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
        assertThat(testFirmaDigital.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    void putNonExistingFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, firmaDigitalDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateFirmaDigitalWithPatch() throws Exception {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();

        // Update the firmaDigital using partial update
        FirmaDigital partialUpdatedFirmaDigital = new FirmaDigital();
        partialUpdatedFirmaDigital.setId(firmaDigital.getId());

        partialUpdatedFirmaDigital.fechaHasta(UPDATED_FECHA_HASTA).path(UPDATED_PATH);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFirmaDigital.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFirmaDigital))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
        FirmaDigital testFirmaDigital = firmaDigitalList.get(firmaDigitalList.size() - 1);
        assertThat(testFirmaDigital.getFechaDesde()).isEqualTo(DEFAULT_FECHA_DESDE);
        assertThat(testFirmaDigital.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
        assertThat(testFirmaDigital.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    void fullUpdateFirmaDigitalWithPatch() throws Exception {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();

        // Update the firmaDigital using partial update
        FirmaDigital partialUpdatedFirmaDigital = new FirmaDigital();
        partialUpdatedFirmaDigital.setId(firmaDigital.getId());

        partialUpdatedFirmaDigital.fechaDesde(UPDATED_FECHA_DESDE).fechaHasta(UPDATED_FECHA_HASTA).path(UPDATED_PATH);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedFirmaDigital.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedFirmaDigital))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
        FirmaDigital testFirmaDigital = firmaDigitalList.get(firmaDigitalList.size() - 1);
        assertThat(testFirmaDigital.getFechaDesde()).isEqualTo(UPDATED_FECHA_DESDE);
        assertThat(testFirmaDigital.getFechaHasta()).isEqualTo(UPDATED_FECHA_HASTA);
        assertThat(testFirmaDigital.getPath()).isEqualTo(UPDATED_PATH);
    }

    @Test
    void patchNonExistingFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, firmaDigitalDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamFirmaDigital() throws Exception {
        int databaseSizeBeforeUpdate = firmaDigitalRepository.findAll().collectList().block().size();
        firmaDigital.setId(longCount.incrementAndGet());

        // Create the FirmaDigital
        FirmaDigitalDTO firmaDigitalDTO = firmaDigitalMapper.toDto(firmaDigital);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(firmaDigitalDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the FirmaDigital in the database
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteFirmaDigital() {
        // Initialize the database
        firmaDigitalRepository.save(firmaDigital).block();

        int databaseSizeBeforeDelete = firmaDigitalRepository.findAll().collectList().block().size();

        // Delete the firmaDigital
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, firmaDigital.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<FirmaDigital> firmaDigitalList = firmaDigitalRepository.findAll().collectList().block();
        assertThat(firmaDigitalList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
