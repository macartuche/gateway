package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.Doctor;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.repository.DoctorRepository;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.service.DoctorService;
import ec.gob.loja.gateway.service.dto.DoctorDTO;
import ec.gob.loja.gateway.service.mapper.DoctorMapper;
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
 * Integration tests for the {@link DoctorResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class DoctorResourceIT {

    private static final String DEFAULT_CODIGO = "AAAAAAAAAA";
    private static final String UPDATED_CODIGO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_ACTIVO = false;
    private static final Boolean UPDATED_ACTIVO = true;

    private static final String ENTITY_API_URL = "/api/doctors";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private DoctorRepository doctorRepository;

    @Mock
    private DoctorRepository doctorRepositoryMock;

    @Autowired
    private DoctorMapper doctorMapper;

    @Mock
    private DoctorService doctorServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Doctor doctor;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doctor createEntity(EntityManager em) {
        Doctor doctor = new Doctor().codigo(DEFAULT_CODIGO).activo(DEFAULT_ACTIVO);
        // Add required entity
        Persona persona;
        persona = em.insert(PersonaResourceIT.createEntity(em)).block();
        doctor.setPersona(persona);
        return doctor;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Doctor createUpdatedEntity(EntityManager em) {
        Doctor doctor = new Doctor().codigo(UPDATED_CODIGO).activo(UPDATED_ACTIVO);
        // Add required entity
        Persona persona;
        persona = em.insert(PersonaResourceIT.createUpdatedEntity(em)).block();
        doctor.setPersona(persona);
        return doctor;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Doctor.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
        PersonaResourceIT.deleteEntities(em);
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        doctor = createEntity(em);
    }

    @Test
    void createDoctor() throws Exception {
        int databaseSizeBeforeCreate = doctorRepository.findAll().collectList().block().size();
        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeCreate + 1);
        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
        assertThat(testDoctor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testDoctor.getActivo()).isEqualTo(DEFAULT_ACTIVO);
    }

    @Test
    void createDoctorWithExistingId() throws Exception {
        // Create the Doctor with an existing ID
        doctor.setId(1L);
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        int databaseSizeBeforeCreate = doctorRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void getAllDoctors() {
        // Initialize the database
        doctorRepository.save(doctor).block();

        // Get all the doctorList
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
            .value(hasItem(doctor.getId().intValue()))
            .jsonPath("$.[*].codigo")
            .value(hasItem(DEFAULT_CODIGO))
            .jsonPath("$.[*].activo")
            .value(hasItem(DEFAULT_ACTIVO.booleanValue()));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDoctorsWithEagerRelationshipsIsEnabled() {
        when(doctorServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(doctorServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllDoctorsWithEagerRelationshipsIsNotEnabled() {
        when(doctorServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(doctorRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getDoctor() {
        // Initialize the database
        doctorRepository.save(doctor).block();

        // Get the doctor
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, doctor.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(doctor.getId().intValue()))
            .jsonPath("$.codigo")
            .value(is(DEFAULT_CODIGO))
            .jsonPath("$.activo")
            .value(is(DEFAULT_ACTIVO.booleanValue()));
    }

    @Test
    void getNonExistingDoctor() {
        // Get the doctor
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingDoctor() throws Exception {
        // Initialize the database
        doctorRepository.save(doctor).block();

        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();

        // Update the doctor
        Doctor updatedDoctor = doctorRepository.findById(doctor.getId()).block();
        updatedDoctor.codigo(UPDATED_CODIGO).activo(UPDATED_ACTIVO);
        DoctorDTO doctorDTO = doctorMapper.toDto(updatedDoctor);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, doctorDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
        assertThat(testDoctor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testDoctor.getActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    void putNonExistingDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, doctorDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdateDoctorWithPatch() throws Exception {
        // Initialize the database
        doctorRepository.save(doctor).block();

        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();

        // Update the doctor using partial update
        Doctor partialUpdatedDoctor = new Doctor();
        partialUpdatedDoctor.setId(doctor.getId());

        partialUpdatedDoctor.activo(UPDATED_ACTIVO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDoctor.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDoctor))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
        assertThat(testDoctor.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testDoctor.getActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    void fullUpdateDoctorWithPatch() throws Exception {
        // Initialize the database
        doctorRepository.save(doctor).block();

        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();

        // Update the doctor using partial update
        Doctor partialUpdatedDoctor = new Doctor();
        partialUpdatedDoctor.setId(doctor.getId());

        partialUpdatedDoctor.codigo(UPDATED_CODIGO).activo(UPDATED_ACTIVO);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedDoctor.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedDoctor))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
        Doctor testDoctor = doctorList.get(doctorList.size() - 1);
        assertThat(testDoctor.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testDoctor.getActivo()).isEqualTo(UPDATED_ACTIVO);
    }

    @Test
    void patchNonExistingDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, doctorDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamDoctor() throws Exception {
        int databaseSizeBeforeUpdate = doctorRepository.findAll().collectList().block().size();
        doctor.setId(longCount.incrementAndGet());

        // Create the Doctor
        DoctorDTO doctorDTO = doctorMapper.toDto(doctor);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(doctorDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Doctor in the database
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deleteDoctor() {
        // Initialize the database
        doctorRepository.save(doctor).block();

        int databaseSizeBeforeDelete = doctorRepository.findAll().collectList().block().size();

        // Delete the doctor
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, doctor.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Doctor> doctorList = doctorRepository.findAll().collectList().block();
        assertThat(doctorList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
