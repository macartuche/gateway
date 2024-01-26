package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.CantonTerritorio;
import ec.gob.loja.gateway.repository.CantonTerritorioRepository;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.service.CantonTerritorioService;
import ec.gob.loja.gateway.service.dto.CantonTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.CantonTerritorioMapper;
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
 * Integration tests for the {@link CantonTerritorioResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class CantonTerritorioResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/canton-territorios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CantonTerritorioRepository cantonTerritorioRepository;

    @Mock
    private CantonTerritorioRepository cantonTerritorioRepositoryMock;

    @Autowired
    private CantonTerritorioMapper cantonTerritorioMapper;

    @Mock
    private CantonTerritorioService cantonTerritorioServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private CantonTerritorio cantonTerritorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantonTerritorio createEntity(EntityManager em) {
        CantonTerritorio cantonTerritorio = new CantonTerritorio().codigo(DEFAULT_CODIGO).nombre(DEFAULT_NOMBRE);
        return cantonTerritorio;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CantonTerritorio createUpdatedEntity(EntityManager em) {
        CantonTerritorio cantonTerritorio = new CantonTerritorio().codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);
        return cantonTerritorio;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(CantonTerritorio.class).block();
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
        cantonTerritorio = createEntity(em);
    }

    @Test
    void createCantonTerritorio() throws Exception {
        int databaseSizeBeforeCreate = cantonTerritorioRepository.findAll().collectList().block().size();
        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeCreate + 1);
        CantonTerritorio testCantonTerritorio = cantonTerritorioList.get(cantonTerritorioList.size() - 1);
        assertThat(testCantonTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCantonTerritorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    void createCantonTerritorioWithExistingId() throws Exception {
        // Create the CantonTerritorio with an existing ID
        cantonTerritorio.setId(1L);
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        int databaseSizeBeforeCreate = cantonTerritorioRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = cantonTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        cantonTerritorio.setCodigo(null);

        // Create the CantonTerritorio, which fails.
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = cantonTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        cantonTerritorio.setNombre(null);

        // Create the CantonTerritorio, which fails.
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllCantonTerritorios() {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        // Get all the cantonTerritorioList
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
            .value(hasItem(cantonTerritorio.getId().intValue()))
            .jsonPath("$.[*].codigo")
            .value(hasItem(DEFAULT_CODIGO))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCantonTerritoriosWithEagerRelationshipsIsEnabled() {
        when(cantonTerritorioServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(cantonTerritorioServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCantonTerritoriosWithEagerRelationshipsIsNotEnabled() {
        when(cantonTerritorioServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(cantonTerritorioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getCantonTerritorio() {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        // Get the cantonTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, cantonTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(cantonTerritorio.getId().intValue()))
            .jsonPath("$.codigo")
            .value(is(DEFAULT_CODIGO))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE));
    }

    @Test
    void getNonExistingCantonTerritorio() {
        // Get the cantonTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingCantonTerritorio() throws Exception {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();

        // Update the cantonTerritorio
        CantonTerritorio updatedCantonTerritorio = cantonTerritorioRepository.findById(cantonTerritorio.getId()).block();
        updatedCantonTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(updatedCantonTerritorio);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cantonTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
        CantonTerritorio testCantonTerritorio = cantonTerritorioList.get(cantonTerritorioList.size() - 1);
        assertThat(testCantonTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCantonTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    void putNonExistingCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, cantonTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateCantonTerritorioWithPatch() throws Exception {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();

        // Update the cantonTerritorio using partial update
        CantonTerritorio partialUpdatedCantonTerritorio = new CantonTerritorio();
        partialUpdatedCantonTerritorio.setId(cantonTerritorio.getId());

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCantonTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCantonTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
        CantonTerritorio testCantonTerritorio = cantonTerritorioList.get(cantonTerritorioList.size() - 1);
        assertThat(testCantonTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testCantonTerritorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    void fullUpdateCantonTerritorioWithPatch() throws Exception {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();

        // Update the cantonTerritorio using partial update
        CantonTerritorio partialUpdatedCantonTerritorio = new CantonTerritorio();
        partialUpdatedCantonTerritorio.setId(cantonTerritorio.getId());

        partialUpdatedCantonTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedCantonTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedCantonTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
        CantonTerritorio testCantonTerritorio = cantonTerritorioList.get(cantonTerritorioList.size() - 1);
        assertThat(testCantonTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testCantonTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    void patchNonExistingCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, cantonTerritorioDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamCantonTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = cantonTerritorioRepository.findAll().collectList().block().size();
        cantonTerritorio.setId(longCount.incrementAndGet());

        // Create the CantonTerritorio
        CantonTerritorioDTO cantonTerritorioDTO = cantonTerritorioMapper.toDto(cantonTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(cantonTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the CantonTerritorio in the database
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteCantonTerritorio() {
        // Initialize the database
        cantonTerritorioRepository.save(cantonTerritorio).block();

        int databaseSizeBeforeDelete = cantonTerritorioRepository.findAll().collectList().block().size();

        // Delete the cantonTerritorio
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, cantonTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<CantonTerritorio> cantonTerritorioList = cantonTerritorioRepository.findAll().collectList().block();
        assertThat(cantonTerritorioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
