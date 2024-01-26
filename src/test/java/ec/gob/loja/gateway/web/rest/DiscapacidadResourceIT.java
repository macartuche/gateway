package ec.gob.loja.gateway.web.rest;

import static ec.gob.loja.gateway.web.rest.TestUtil.sameNumber;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Discapacidad;
import ec.gob.loja.gateway.repository.DiscapacidadRepository;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.service.DiscapacidadService;
import ec.gob.loja.gateway.service.dto.DiscapacidadDTO;
import ec.gob.loja.gateway.service.mapper.DiscapacidadMapper;
import java.math.BigDecimal;
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
 * Integration tests for the {@link DiscapacidadResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DiscapacidadResourceIT {

    private static final BigDecimal DEFAULT_PORCENTAJE = new BigDecimal(1);
    private static final BigDecimal UPDATED_PORCENTAJE = new BigDecimal(2);

    private static final String ENTITY_API_URL = "/api/discapacidads";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DiscapacidadRepository discapacidadRepository;

    @Mock
    private DiscapacidadRepository discapacidadRepositoryMock;

    @Autowired
    private DiscapacidadMapper discapacidadMapper;

    @Mock
    private DiscapacidadService discapacidadServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Discapacidad discapacidad;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discapacidad createEntity(EntityManager em) {
        Discapacidad discapacidad = new Discapacidad().porcentaje(DEFAULT_PORCENTAJE);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createEntity(em)).block();
        discapacidad.setTipo(catalogoItem);
        // Add required entity
        discapacidad.setEstado(catalogoItem);
        return discapacidad;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Discapacidad createUpdatedEntity(EntityManager em) {
        Discapacidad discapacidad = new Discapacidad().porcentaje(UPDATED_PORCENTAJE);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createUpdatedEntity(em)).block();
        discapacidad.setTipo(catalogoItem);
        // Add required entity
        discapacidad.setEstado(catalogoItem);
        return discapacidad;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Discapacidad.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
        CatalogoItemResourceIT.deleteEntities(em);
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        discapacidad = createEntity(em);
    }

    @Test
    void createDiscapacidad() throws Exception {
        int databaseSizeBeforeCreate = discapacidadRepository.findAll().collectList().block().size();
        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeCreate + 1);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getPorcentaje()).isEqualByComparingTo(DEFAULT_PORCENTAJE);
    }

    @Test
    void createDiscapacidadWithExistingId() throws Exception {
        // Create the Discapacidad with an existing ID
        discapacidad.setId(1L);
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        int databaseSizeBeforeCreate = discapacidadRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkPorcentajeIsRequired() throws Exception {
        int databaseSizeBeforeTest = discapacidadRepository.findAll().collectList().block().size();
        // set the field null
        discapacidad.setPorcentaje(null);

        // Create the Discapacidad, which fails.
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllDiscapacidads() {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        // Get all the discapacidadList
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
            .value(hasItem(discapacidad.getId().intValue()))
            .jsonPath("$.[*].porcentaje")
            .value(hasItem(sameNumber(DEFAULT_PORCENTAJE)));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDiscapacidadsWithEagerRelationshipsIsEnabled() {
        when(discapacidadServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(discapacidadServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDiscapacidadsWithEagerRelationshipsIsNotEnabled() {
        when(discapacidadServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(discapacidadRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getDiscapacidad() {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        // Get the discapacidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, discapacidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(discapacidad.getId().intValue()))
            .jsonPath("$.porcentaje")
            .value(is(sameNumber(DEFAULT_PORCENTAJE)));
    }

    @Test
    void getNonExistingDiscapacidad() {
        // Get the discapacidad
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingDiscapacidad() throws Exception {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();

        // Update the discapacidad
        Discapacidad updatedDiscapacidad = discapacidadRepository.findById(discapacidad.getId()).block();
        updatedDiscapacidad.porcentaje(UPDATED_PORCENTAJE);
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(updatedDiscapacidad);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, discapacidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getPorcentaje()).isEqualByComparingTo(UPDATED_PORCENTAJE);
    }

    @Test
    void putNonExistingDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, discapacidadDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDiscapacidadWithPatch() throws Exception {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();

        // Update the discapacidad using partial update
        Discapacidad partialUpdatedDiscapacidad = new Discapacidad();
        partialUpdatedDiscapacidad.setId(discapacidad.getId());

        partialUpdatedDiscapacidad.porcentaje(UPDATED_PORCENTAJE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDiscapacidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDiscapacidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getPorcentaje()).isEqualByComparingTo(UPDATED_PORCENTAJE);
    }

    @Test
    void fullUpdateDiscapacidadWithPatch() throws Exception {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();

        // Update the discapacidad using partial update
        Discapacidad partialUpdatedDiscapacidad = new Discapacidad();
        partialUpdatedDiscapacidad.setId(discapacidad.getId());

        partialUpdatedDiscapacidad.porcentaje(UPDATED_PORCENTAJE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDiscapacidad.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDiscapacidad))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
        Discapacidad testDiscapacidad = discapacidadList.get(discapacidadList.size() - 1);
        assertThat(testDiscapacidad.getPorcentaje()).isEqualByComparingTo(UPDATED_PORCENTAJE);
    }

    @Test
    void patchNonExistingDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, discapacidadDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDiscapacidad() throws Exception {
        int databaseSizeBeforeUpdate = discapacidadRepository.findAll().collectList().block().size();
        discapacidad.setId(longCount.incrementAndGet());

        // Create the Discapacidad
        DiscapacidadDTO discapacidadDTO = discapacidadMapper.toDto(discapacidad);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(discapacidadDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Discapacidad in the database
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDiscapacidad() {
        // Initialize the database
        discapacidadRepository.save(discapacidad).block();

        int databaseSizeBeforeDelete = discapacidadRepository.findAll().collectList().block().size();

        // Delete the discapacidad
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, discapacidad.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Discapacidad> discapacidadList = discapacidadRepository.findAll().collectList().block();
        assertThat(discapacidadList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
