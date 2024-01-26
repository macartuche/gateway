package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.ParroquiaTerritorioRepository;
import ec.gob.loja.gateway.service.ParroquiaTerritorioService;
import ec.gob.loja.gateway.service.dto.ParroquiaTerritorioDTO;
import ec.gob.loja.gateway.service.mapper.ParroquiaTerritorioMapper;
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
 * Integration tests for the {@link ParroquiaTerritorioResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ParroquiaTerritorioResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/parroquia-territorios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ParroquiaTerritorioRepository parroquiaTerritorioRepository;

    @Mock
    private ParroquiaTerritorioRepository parroquiaTerritorioRepositoryMock;

    @Autowired
    private ParroquiaTerritorioMapper parroquiaTerritorioMapper;

    @Mock
    private ParroquiaTerritorioService parroquiaTerritorioServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private ParroquiaTerritorio parroquiaTerritorio;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParroquiaTerritorio createEntity(EntityManager em) {
        ParroquiaTerritorio parroquiaTerritorio = new ParroquiaTerritorio().codigo(DEFAULT_CODIGO).nombre(DEFAULT_NOMBRE);
        return parroquiaTerritorio;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ParroquiaTerritorio createUpdatedEntity(EntityManager em) {
        ParroquiaTerritorio parroquiaTerritorio = new ParroquiaTerritorio().codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);
        return parroquiaTerritorio;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(ParroquiaTerritorio.class).block();
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
        parroquiaTerritorio = createEntity(em);
    }

    @Test
    void createParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeCreate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeCreate + 1);
        ParroquiaTerritorio testParroquiaTerritorio = parroquiaTerritorioList.get(parroquiaTerritorioList.size() - 1);
        assertThat(testParroquiaTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testParroquiaTerritorio.getNombre()).isEqualTo(DEFAULT_NOMBRE);
    }

    @Test
    void createParroquiaTerritorioWithExistingId() throws Exception {
        // Create the ParroquiaTerritorio with an existing ID
        parroquiaTerritorio.setId(1L);
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        int databaseSizeBeforeCreate = parroquiaTerritorioRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkCodigoIsRequired() throws Exception {
        int databaseSizeBeforeTest = parroquiaTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        parroquiaTerritorio.setCodigo(null);

        // Create the ParroquiaTerritorio, which fails.
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = parroquiaTerritorioRepository.findAll().collectList().block().size();
        // set the field null
        parroquiaTerritorio.setNombre(null);

        // Create the ParroquiaTerritorio, which fails.
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllParroquiaTerritorios() {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        // Get all the parroquiaTerritorioList
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
            .value(hasItem(parroquiaTerritorio.getId().intValue()))
            .jsonPath("$.[*].codigo")
            .value(hasItem(DEFAULT_CODIGO))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllParroquiaTerritoriosWithEagerRelationshipsIsEnabled() {
        when(parroquiaTerritorioServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(parroquiaTerritorioServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllParroquiaTerritoriosWithEagerRelationshipsIsNotEnabled() {
        when(parroquiaTerritorioServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(parroquiaTerritorioRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getParroquiaTerritorio() {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        // Get the parroquiaTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, parroquiaTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(parroquiaTerritorio.getId().intValue()))
            .jsonPath("$.codigo")
            .value(is(DEFAULT_CODIGO))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE));
    }

    @Test
    void getNonExistingParroquiaTerritorio() {
        // Get the parroquiaTerritorio
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingParroquiaTerritorio() throws Exception {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();

        // Update the parroquiaTerritorio
        ParroquiaTerritorio updatedParroquiaTerritorio = parroquiaTerritorioRepository.findById(parroquiaTerritorio.getId()).block();
        updatedParroquiaTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(updatedParroquiaTerritorio);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, parroquiaTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ParroquiaTerritorio testParroquiaTerritorio = parroquiaTerritorioList.get(parroquiaTerritorioList.size() - 1);
        assertThat(testParroquiaTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testParroquiaTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    void putNonExistingParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, parroquiaTerritorioDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateParroquiaTerritorioWithPatch() throws Exception {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();

        // Update the parroquiaTerritorio using partial update
        ParroquiaTerritorio partialUpdatedParroquiaTerritorio = new ParroquiaTerritorio();
        partialUpdatedParroquiaTerritorio.setId(parroquiaTerritorio.getId());

        partialUpdatedParroquiaTerritorio.nombre(UPDATED_NOMBRE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedParroquiaTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedParroquiaTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ParroquiaTerritorio testParroquiaTerritorio = parroquiaTerritorioList.get(parroquiaTerritorioList.size() - 1);
        assertThat(testParroquiaTerritorio.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testParroquiaTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    void fullUpdateParroquiaTerritorioWithPatch() throws Exception {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();

        // Update the parroquiaTerritorio using partial update
        ParroquiaTerritorio partialUpdatedParroquiaTerritorio = new ParroquiaTerritorio();
        partialUpdatedParroquiaTerritorio.setId(parroquiaTerritorio.getId());

        partialUpdatedParroquiaTerritorio.codigo(UPDATED_CODIGO).nombre(UPDATED_NOMBRE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedParroquiaTerritorio.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedParroquiaTerritorio))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
        ParroquiaTerritorio testParroquiaTerritorio = parroquiaTerritorioList.get(parroquiaTerritorioList.size() - 1);
        assertThat(testParroquiaTerritorio.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testParroquiaTerritorio.getNombre()).isEqualTo(UPDATED_NOMBRE);
    }

    @Test
    void patchNonExistingParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, parroquiaTerritorioDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamParroquiaTerritorio() throws Exception {
        int databaseSizeBeforeUpdate = parroquiaTerritorioRepository.findAll().collectList().block().size();
        parroquiaTerritorio.setId(longCount.incrementAndGet());

        // Create the ParroquiaTerritorio
        ParroquiaTerritorioDTO parroquiaTerritorioDTO = parroquiaTerritorioMapper.toDto(parroquiaTerritorio);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(parroquiaTerritorioDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ParroquiaTerritorio in the database
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteParroquiaTerritorio() {
        // Initialize the database
        parroquiaTerritorioRepository.save(parroquiaTerritorio).block();

        int databaseSizeBeforeDelete = parroquiaTerritorioRepository.findAll().collectList().block().size();

        // Delete the parroquiaTerritorio
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, parroquiaTerritorio.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<ParroquiaTerritorio> parroquiaTerritorioList = parroquiaTerritorioRepository.findAll().collectList().block();
        assertThat(parroquiaTerritorioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
