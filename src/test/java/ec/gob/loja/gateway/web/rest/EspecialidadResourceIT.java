package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.Especialidad;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.EspecialidadRepository;
import ec.gob.loja.gateway.service.EspecialidadService;
import ec.gob.loja.gateway.service.dto.EspecialidadDTO;
import ec.gob.loja.gateway.service.mapper.EspecialidadMapper;
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
 * Integration tests for the {@link EspecialidadResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class EspecialidadResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVA = false;
    private static final Boolean UPDATED_ACTIVA = true;

    private static final String ENTITY_API_URL = "/api/especialidads";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private EspecialidadRepository especialidadRepository;

    @Mock
    private EspecialidadRepository especialidadRepositoryMock;

    @Autowired
    private EspecialidadMapper especialidadMapper;

    @Mock
    private EspecialidadService especialidadServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Especialidad especialidad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Especialidad createEntity(EntityManager em) {
        Especialidad especialidad = new Especialidad().nombre(DEFAULT_NOMBRE).activa(DEFAULT_ACTIVA);
        return especialidad;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Especialidad createUpdatedEntity(EntityManager em) {
        Especialidad especialidad = new Especialidad().nombre(UPDATED_NOMBRE).activa(UPDATED_ACTIVA);
        return especialidad;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Especialidad.class).block();
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
        especialidad = createEntity(em);
    }

    @Test
    void createEspecialidad() throws Exception {
        int databaseSizeBeforeCreate = especialidadRepository.findAll().collectList().block().size();
        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeCreate + 1);
        Especialidad testEspecialidad = especialidadList.get(especialidadList.size() - 1);
        assertThat(testEspecialidad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEspecialidad.getActiva()).isEqualTo(DEFAULT_ACTIVA);
    }

    @Test
    void createEspecialidadWithExistingId() throws Exception {
        // Create the Especialidad with an existing ID
        especialidad.setId(1L);
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        int databaseSizeBeforeCreate = especialidadRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = especialidadRepository.findAll().collectList().block().size();
        // set the field null
        especialidad.setNombre(null);

        // Create the Especialidad, which fails.
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkActivaIsRequired() throws Exception {
        int databaseSizeBeforeTest = especialidadRepository.findAll().collectList().block().size();
        // set the field null
        especialidad.setActiva(null);

        // Create the Especialidad, which fails.
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllEspecialidads() {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        // Get all the especialidadList
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
            .value(hasItem(especialidad.getId().intValue()))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE))
            .jsonPath("$.[*].activa")
            .value(hasItem(DEFAULT_ACTIVA.booleanValue()));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEspecialidadsWithEagerRelationshipsIsEnabled() {
        when(especialidadServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(especialidadServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllEspecialidadsWithEagerRelationshipsIsNotEnabled() {
        when(especialidadServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(especialidadRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getEspecialidad() {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        // Get the especialidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, especialidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(especialidad.getId().intValue()))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE))
            .jsonPath("$.activa")
            .value(is(DEFAULT_ACTIVA.booleanValue()));
    }

    @Test
    void getNonExistingEspecialidad() {
        // Get the especialidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingEspecialidad() throws Exception {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();

        // Update the especialidad
        Especialidad updatedEspecialidad = especialidadRepository.findById(especialidad.getId()).block();
        updatedEspecialidad.nombre(UPDATED_NOMBRE).activa(UPDATED_ACTIVA);
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(updatedEspecialidad);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, especialidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
        Especialidad testEspecialidad = especialidadList.get(especialidadList.size() - 1);
        assertThat(testEspecialidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEspecialidad.getActiva()).isEqualTo(UPDATED_ACTIVA);
    }

    @Test
    void putNonExistingEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, especialidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateEspecialidadWithPatch() throws Exception {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();

        // Update the especialidad using partial update
        Especialidad partialUpdatedEspecialidad = new Especialidad();
        partialUpdatedEspecialidad.setId(especialidad.getId());

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEspecialidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedEspecialidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
        Especialidad testEspecialidad = especialidadList.get(especialidadList.size() - 1);
        assertThat(testEspecialidad.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testEspecialidad.getActiva()).isEqualTo(DEFAULT_ACTIVA);
    }

    @Test
    void fullUpdateEspecialidadWithPatch() throws Exception {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();

        // Update the especialidad using partial update
        Especialidad partialUpdatedEspecialidad = new Especialidad();
        partialUpdatedEspecialidad.setId(especialidad.getId());

        partialUpdatedEspecialidad.nombre(UPDATED_NOMBRE).activa(UPDATED_ACTIVA);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedEspecialidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedEspecialidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
        Especialidad testEspecialidad = especialidadList.get(especialidadList.size() - 1);
        assertThat(testEspecialidad.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testEspecialidad.getActiva()).isEqualTo(UPDATED_ACTIVA);
    }

    @Test
    void patchNonExistingEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, especialidadDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamEspecialidad() throws Exception {
        int databaseSizeBeforeUpdate = especialidadRepository.findAll().collectList().block().size();
        especialidad.setId(longCount.incrementAndGet());

        // Create the Especialidad
        EspecialidadDTO especialidadDTO = especialidadMapper.toDto(especialidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(especialidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Especialidad in the database
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteEspecialidad() {
        // Initialize the database
        especialidadRepository.save(especialidad).block();

        int databaseSizeBeforeDelete = especialidadRepository.findAll().collectList().block().size();

        // Delete the especialidad
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, especialidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Especialidad> especialidadList = especialidadRepository.findAll().collectList().block();
        assertThat(especialidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
