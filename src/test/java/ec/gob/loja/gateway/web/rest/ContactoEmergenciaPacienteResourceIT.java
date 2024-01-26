package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente;
import ec.gob.loja.gateway.domain.Paciente;
import ec.gob.loja.gateway.repository.ContactoEmergenciaPacienteRepository;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.service.ContactoEmergenciaPacienteService;
import ec.gob.loja.gateway.service.dto.ContactoEmergenciaPacienteDTO;
import ec.gob.loja.gateway.service.mapper.ContactoEmergenciaPacienteMapper;
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
 * Integration tests for the {@link ContactoEmergenciaPacienteResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class ContactoEmergenciaPacienteResourceIT {

    private static final String DEFAULT_NOMBRE = "AAAAAAAAAA";
    private static final String UPDATED_NOMBRE = "BBBBBBBBBB";

    private static final String DEFAULT_TELEFONO = "AAAAAAAAAA";
    private static final String UPDATED_TELEFONO = "BBBBBBBBBB";

    private static final String DEFAULT_DIRECCION = "AAAAAAAAAA";
    private static final String UPDATED_DIRECCION = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/contacto-emergencia-pacientes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepository;

    @Mock
    private ContactoEmergenciaPacienteRepository contactoEmergenciaPacienteRepositoryMock;

    @Autowired
    private ContactoEmergenciaPacienteMapper contactoEmergenciaPacienteMapper;

    @Mock
    private ContactoEmergenciaPacienteService contactoEmergenciaPacienteServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private ContactoEmergenciaPaciente contactoEmergenciaPaciente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoEmergenciaPaciente createEntity(EntityManager em) {
        ContactoEmergenciaPaciente contactoEmergenciaPaciente = new ContactoEmergenciaPaciente()
            .nombre(DEFAULT_NOMBRE)
            .telefono(DEFAULT_TELEFONO)
            .direccion(DEFAULT_DIRECCION);
        // Add required entity
        Paciente paciente;
        paciente = em.insert(PacienteResourceIT.createEntity(em)).block();
        contactoEmergenciaPaciente.setPaciente(paciente);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createEntity(em)).block();
        contactoEmergenciaPaciente.setParentezco(catalogoItem);
        return contactoEmergenciaPaciente;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ContactoEmergenciaPaciente createUpdatedEntity(EntityManager em) {
        ContactoEmergenciaPaciente contactoEmergenciaPaciente = new ContactoEmergenciaPaciente()
            .nombre(UPDATED_NOMBRE)
            .telefono(UPDATED_TELEFONO)
            .direccion(UPDATED_DIRECCION);
        // Add required entity
        Paciente paciente;
        paciente = em.insert(PacienteResourceIT.createUpdatedEntity(em)).block();
        contactoEmergenciaPaciente.setPaciente(paciente);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createUpdatedEntity(em)).block();
        contactoEmergenciaPaciente.setParentezco(catalogoItem);
        return contactoEmergenciaPaciente;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(ContactoEmergenciaPaciente.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
        PacienteResourceIT.deleteEntities(em);
        CatalogoItemResourceIT.deleteEntities(em);
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        contactoEmergenciaPaciente = createEntity(em);
    }

    @Test
    void createContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeCreate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeCreate + 1);
        ContactoEmergenciaPaciente testContactoEmergenciaPaciente = contactoEmergenciaPacienteList.get(
            contactoEmergenciaPacienteList.size() - 1
        );
        assertThat(testContactoEmergenciaPaciente.getNombre()).isEqualTo(DEFAULT_NOMBRE);
        assertThat(testContactoEmergenciaPaciente.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testContactoEmergenciaPaciente.getDireccion()).isEqualTo(DEFAULT_DIRECCION);
    }

    @Test
    void createContactoEmergenciaPacienteWithExistingId() throws Exception {
        // Create the ContactoEmergenciaPaciente with an existing ID
        contactoEmergenciaPaciente.setId(1L);
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        int databaseSizeBeforeCreate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkNombreIsRequired() throws Exception {
        int databaseSizeBeforeTest = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        // set the field null
        contactoEmergenciaPaciente.setNombre(null);

        // Create the ContactoEmergenciaPaciente, which fails.
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllContactoEmergenciaPacientes() {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        // Get all the contactoEmergenciaPacienteList
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
            .value(hasItem(contactoEmergenciaPaciente.getId().intValue()))
            .jsonPath("$.[*].nombre")
            .value(hasItem(DEFAULT_NOMBRE))
            .jsonPath("$.[*].telefono")
            .value(hasItem(DEFAULT_TELEFONO))
            .jsonPath("$.[*].direccion")
            .value(hasItem(DEFAULT_DIRECCION));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllContactoEmergenciaPacientesWithEagerRelationshipsIsEnabled() {
        when(contactoEmergenciaPacienteServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(contactoEmergenciaPacienteServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllContactoEmergenciaPacientesWithEagerRelationshipsIsNotEnabled() {
        when(contactoEmergenciaPacienteServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(contactoEmergenciaPacienteRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getContactoEmergenciaPaciente() {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        // Get the contactoEmergenciaPaciente
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, contactoEmergenciaPaciente.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(contactoEmergenciaPaciente.getId().intValue()))
            .jsonPath("$.nombre")
            .value(is(DEFAULT_NOMBRE))
            .jsonPath("$.telefono")
            .value(is(DEFAULT_TELEFONO))
            .jsonPath("$.direccion")
            .value(is(DEFAULT_DIRECCION));
    }

    @Test
    void getNonExistingContactoEmergenciaPaciente() {
        // Get the contactoEmergenciaPaciente
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingContactoEmergenciaPaciente() throws Exception {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();

        // Update the contactoEmergenciaPaciente
        ContactoEmergenciaPaciente updatedContactoEmergenciaPaciente = contactoEmergenciaPacienteRepository
            .findById(contactoEmergenciaPaciente.getId())
            .block();
        updatedContactoEmergenciaPaciente.nombre(UPDATED_NOMBRE).telefono(UPDATED_TELEFONO).direccion(UPDATED_DIRECCION);
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(
            updatedContactoEmergenciaPaciente
        );

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, contactoEmergenciaPacienteDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
        ContactoEmergenciaPaciente testContactoEmergenciaPaciente = contactoEmergenciaPacienteList.get(
            contactoEmergenciaPacienteList.size() - 1
        );
        assertThat(testContactoEmergenciaPaciente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testContactoEmergenciaPaciente.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testContactoEmergenciaPaciente.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    void putNonExistingContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, contactoEmergenciaPacienteDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateContactoEmergenciaPacienteWithPatch() throws Exception {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();

        // Update the contactoEmergenciaPaciente using partial update
        ContactoEmergenciaPaciente partialUpdatedContactoEmergenciaPaciente = new ContactoEmergenciaPaciente();
        partialUpdatedContactoEmergenciaPaciente.setId(contactoEmergenciaPaciente.getId());

        partialUpdatedContactoEmergenciaPaciente.nombre(UPDATED_NOMBRE).direccion(UPDATED_DIRECCION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContactoEmergenciaPaciente.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedContactoEmergenciaPaciente))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
        ContactoEmergenciaPaciente testContactoEmergenciaPaciente = contactoEmergenciaPacienteList.get(
            contactoEmergenciaPacienteList.size() - 1
        );
        assertThat(testContactoEmergenciaPaciente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testContactoEmergenciaPaciente.getTelefono()).isEqualTo(DEFAULT_TELEFONO);
        assertThat(testContactoEmergenciaPaciente.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    void fullUpdateContactoEmergenciaPacienteWithPatch() throws Exception {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();

        // Update the contactoEmergenciaPaciente using partial update
        ContactoEmergenciaPaciente partialUpdatedContactoEmergenciaPaciente = new ContactoEmergenciaPaciente();
        partialUpdatedContactoEmergenciaPaciente.setId(contactoEmergenciaPaciente.getId());

        partialUpdatedContactoEmergenciaPaciente.nombre(UPDATED_NOMBRE).telefono(UPDATED_TELEFONO).direccion(UPDATED_DIRECCION);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedContactoEmergenciaPaciente.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedContactoEmergenciaPaciente))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
        ContactoEmergenciaPaciente testContactoEmergenciaPaciente = contactoEmergenciaPacienteList.get(
            contactoEmergenciaPacienteList.size() - 1
        );
        assertThat(testContactoEmergenciaPaciente.getNombre()).isEqualTo(UPDATED_NOMBRE);
        assertThat(testContactoEmergenciaPaciente.getTelefono()).isEqualTo(UPDATED_TELEFONO);
        assertThat(testContactoEmergenciaPaciente.getDireccion()).isEqualTo(UPDATED_DIRECCION);
    }

    @Test
    void patchNonExistingContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, contactoEmergenciaPacienteDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamContactoEmergenciaPaciente() throws Exception {
        int databaseSizeBeforeUpdate = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();
        contactoEmergenciaPaciente.setId(longCount.incrementAndGet());

        // Create the ContactoEmergenciaPaciente
        ContactoEmergenciaPacienteDTO contactoEmergenciaPacienteDTO = contactoEmergenciaPacienteMapper.toDto(contactoEmergenciaPaciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(contactoEmergenciaPacienteDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the ContactoEmergenciaPaciente in the database
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteContactoEmergenciaPaciente() {
        // Initialize the database
        contactoEmergenciaPacienteRepository.save(contactoEmergenciaPaciente).block();

        int databaseSizeBeforeDelete = contactoEmergenciaPacienteRepository.findAll().collectList().block().size();

        // Delete the contactoEmergenciaPaciente
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, contactoEmergenciaPaciente.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<ContactoEmergenciaPaciente> contactoEmergenciaPacienteList = contactoEmergenciaPacienteRepository
            .findAll()
            .collectList()
            .block();
        assertThat(contactoEmergenciaPacienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
