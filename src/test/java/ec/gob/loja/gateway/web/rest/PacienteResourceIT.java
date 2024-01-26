package ec.gob.loja.gateway.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.hamcrest.Matchers.is;
import static org.mockito.Mockito.*;

import ec.gob.loja.gateway.IntegrationTest;
import ec.gob.loja.gateway.domain.CatalogoItem;
import ec.gob.loja.gateway.domain.Paciente;
import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.repository.EntityManager;
import ec.gob.loja.gateway.repository.PacienteRepository;
import ec.gob.loja.gateway.service.PacienteService;
import ec.gob.loja.gateway.service.dto.PacienteDTO;
import ec.gob.loja.gateway.service.mapper.PacienteMapper;
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
 * Integration tests for the {@link PacienteResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureWebTestClient(timeout = IntegrationTest.DEFAULT_ENTITY_TIMEOUT)
@WithMockUser
class PacienteResourceIT {

    private static final String DEFAULT_LUGAR_NACIMIENTO = "AAAAAAAAAA";
    private static final String UPDATED_LUGAR_NACIMIENTO = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FECHA_NACIMIENTO = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_NACIMIENTO = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_CALLE_PRINCIPAL = "AAAAAAAAAA";
    private static final String UPDATED_CALLE_PRINCIPAL = "BBBBBBBBBB";

    private static final String DEFAULT_NUMERO_CASA = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_CASA = "BBBBBBBBBB";

    private static final String DEFAULT_CALLE_SECUNDARIA = "AAAAAAAAAA";
    private static final String UPDATED_CALLE_SECUNDARIA = "BBBBBBBBBB";

    private static final String DEFAULT_BARRIO = "AAAAAAAAAA";
    private static final String UPDATED_BARRIO = "BBBBBBBBBB";

    private static final String DEFAULT_REFERENCIA_DOMICILIO = "AAAAAAAAAA";
    private static final String UPDATED_REFERENCIA_DOMICILIO = "BBBBBBBBBB";

    private static final String DEFAULT_SEGURO_SALUD_SECUNDARIO = "AAAAAAAAAA";
    private static final String UPDATED_SEGURO_SALUD_SECUNDARIO = "BBBBBBBBBB";

    private static final String DEFAULT_IDENTIFICACION_REPRESENTANTE = "AAAAAAAAAA";
    private static final String UPDATED_IDENTIFICACION_REPRESENTANTE = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/pacientes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private PacienteRepository pacienteRepository;

    @Mock
    private PacienteRepository pacienteRepositoryMock;

    @Autowired
    private PacienteMapper pacienteMapper;

    @Mock
    private PacienteService pacienteServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private WebTestClient webTestClient;

    private Paciente paciente;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paciente createEntity(EntityManager em) {
        Paciente paciente = new Paciente()
            .lugarNacimiento(DEFAULT_LUGAR_NACIMIENTO)
            .fechaNacimiento(DEFAULT_FECHA_NACIMIENTO)
            .callePrincipal(DEFAULT_CALLE_PRINCIPAL)
            .numeroCasa(DEFAULT_NUMERO_CASA)
            .calleSecundaria(DEFAULT_CALLE_SECUNDARIA)
            .barrio(DEFAULT_BARRIO)
            .referenciaDomicilio(DEFAULT_REFERENCIA_DOMICILIO)
            .seguroSaludSecundario(DEFAULT_SEGURO_SALUD_SECUNDARIO)
            .identificacionRepresentante(DEFAULT_IDENTIFICACION_REPRESENTANTE);
        // Add required entity
        Persona persona;
        persona = em.insert(PersonaResourceIT.createEntity(em)).block();
        paciente.setPersona(persona);
        // Add required entity
        ParroquiaTerritorio parroquiaTerritorio;
        parroquiaTerritorio = em.insert(ParroquiaTerritorioResourceIT.createEntity(em)).block();
        paciente.setParroquiaResidencia(parroquiaTerritorio);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createEntity(em)).block();
        paciente.setAutoidentificacionEtnica(catalogoItem);
        // Add required entity
        paciente.setTipoEmpresaTrabajo(catalogoItem);
        // Add required entity
        paciente.setProfesionOcupacion(catalogoItem);
        // Add required entity
        paciente.setSeguroSaludPrincipal(catalogoItem);
        // Add required entity
        paciente.setTipoBono(catalogoItem);
        // Add required entity
        paciente.setProcedenciaRepresentante(catalogoItem);
        return paciente;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Paciente createUpdatedEntity(EntityManager em) {
        Paciente paciente = new Paciente()
            .lugarNacimiento(UPDATED_LUGAR_NACIMIENTO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .callePrincipal(UPDATED_CALLE_PRINCIPAL)
            .numeroCasa(UPDATED_NUMERO_CASA)
            .calleSecundaria(UPDATED_CALLE_SECUNDARIA)
            .barrio(UPDATED_BARRIO)
            .referenciaDomicilio(UPDATED_REFERENCIA_DOMICILIO)
            .seguroSaludSecundario(UPDATED_SEGURO_SALUD_SECUNDARIO)
            .identificacionRepresentante(UPDATED_IDENTIFICACION_REPRESENTANTE);
        // Add required entity
        Persona persona;
        persona = em.insert(PersonaResourceIT.createUpdatedEntity(em)).block();
        paciente.setPersona(persona);
        // Add required entity
        ParroquiaTerritorio parroquiaTerritorio;
        parroquiaTerritorio = em.insert(ParroquiaTerritorioResourceIT.createUpdatedEntity(em)).block();
        paciente.setParroquiaResidencia(parroquiaTerritorio);
        // Add required entity
        CatalogoItem catalogoItem;
        catalogoItem = em.insert(CatalogoItemResourceIT.createUpdatedEntity(em)).block();
        paciente.setAutoidentificacionEtnica(catalogoItem);
        // Add required entity
        paciente.setTipoEmpresaTrabajo(catalogoItem);
        // Add required entity
        paciente.setProfesionOcupacion(catalogoItem);
        // Add required entity
        paciente.setSeguroSaludPrincipal(catalogoItem);
        // Add required entity
        paciente.setTipoBono(catalogoItem);
        // Add required entity
        paciente.setProcedenciaRepresentante(catalogoItem);
        return paciente;
    }

    public static void deleteEntities(EntityManager em) {
        try {
            em.deleteAll(Paciente.class).block();
        } catch (Exception e) {
            // It can fail, if other entities are still referring this - it will be removed later.
        }
        PersonaResourceIT.deleteEntities(em);
        ParroquiaTerritorioResourceIT.deleteEntities(em);
        CatalogoItemResourceIT.deleteEntities(em);
    }

    @AfterEach
    public void cleanup() {
        deleteEntities(em);
    }

    @BeforeEach
    public void initTest() {
        deleteEntities(em);
        paciente = createEntity(em);
    }

    @Test
    void createPaciente() throws Exception {
        int databaseSizeBeforeCreate = pacienteRepository.findAll().collectList().block().size();
        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isCreated();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeCreate + 1);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getLugarNacimiento()).isEqualTo(DEFAULT_LUGAR_NACIMIENTO);
        assertThat(testPaciente.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testPaciente.getCallePrincipal()).isEqualTo(DEFAULT_CALLE_PRINCIPAL);
        assertThat(testPaciente.getNumeroCasa()).isEqualTo(DEFAULT_NUMERO_CASA);
        assertThat(testPaciente.getCalleSecundaria()).isEqualTo(DEFAULT_CALLE_SECUNDARIA);
        assertThat(testPaciente.getBarrio()).isEqualTo(DEFAULT_BARRIO);
        assertThat(testPaciente.getReferenciaDomicilio()).isEqualTo(DEFAULT_REFERENCIA_DOMICILIO);
        assertThat(testPaciente.getSeguroSaludSecundario()).isEqualTo(DEFAULT_SEGURO_SALUD_SECUNDARIO);
        assertThat(testPaciente.getIdentificacionRepresentante()).isEqualTo(DEFAULT_IDENTIFICACION_REPRESENTANTE);
    }

    @Test
    void createPacienteWithExistingId() throws Exception {
        // Create the Paciente with an existing ID
        paciente.setId(1L);
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        int databaseSizeBeforeCreate = pacienteRepository.findAll().collectList().block().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    void checkLugarNacimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacienteRepository.findAll().collectList().block().size();
        // set the field null
        paciente.setLugarNacimiento(null);

        // Create the Paciente, which fails.
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkFechaNacimientoIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacienteRepository.findAll().collectList().block().size();
        // set the field null
        paciente.setFechaNacimiento(null);

        // Create the Paciente, which fails.
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void checkBarrioIsRequired() throws Exception {
        int databaseSizeBeforeTest = pacienteRepository.findAll().collectList().block().size();
        // set the field null
        paciente.setBarrio(null);

        // Create the Paciente, which fails.
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        webTestClient
            .post()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    void getAllPacientes() {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        // Get all the pacienteList
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
            .value(hasItem(paciente.getId().intValue()))
            .jsonPath("$.[*].lugarNacimiento")
            .value(hasItem(DEFAULT_LUGAR_NACIMIENTO))
            .jsonPath("$.[*].fechaNacimiento")
            .value(hasItem(DEFAULT_FECHA_NACIMIENTO.toString()))
            .jsonPath("$.[*].callePrincipal")
            .value(hasItem(DEFAULT_CALLE_PRINCIPAL))
            .jsonPath("$.[*].numeroCasa")
            .value(hasItem(DEFAULT_NUMERO_CASA))
            .jsonPath("$.[*].calleSecundaria")
            .value(hasItem(DEFAULT_CALLE_SECUNDARIA))
            .jsonPath("$.[*].barrio")
            .value(hasItem(DEFAULT_BARRIO))
            .jsonPath("$.[*].referenciaDomicilio")
            .value(hasItem(DEFAULT_REFERENCIA_DOMICILIO))
            .jsonPath("$.[*].seguroSaludSecundario")
            .value(hasItem(DEFAULT_SEGURO_SALUD_SECUNDARIO))
            .jsonPath("$.[*].identificacionRepresentante")
            .value(hasItem(DEFAULT_IDENTIFICACION_REPRESENTANTE));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPacientesWithEagerRelationshipsIsEnabled() {
        when(pacienteServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=true").exchange().expectStatus().isOk();

        verify(pacienteServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllPacientesWithEagerRelationshipsIsNotEnabled() {
        when(pacienteServiceMock.findAllWithEagerRelationships(any())).thenReturn(Flux.empty());

        webTestClient.get().uri(ENTITY_API_URL + "?eagerload=false").exchange().expectStatus().isOk();
        verify(pacienteRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    void getPaciente() {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        // Get the paciente
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, paciente.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isOk()
            .expectHeader()
            .contentType(MediaType.APPLICATION_JSON)
            .expectBody()
            .jsonPath("$.id")
            .value(is(paciente.getId().intValue()))
            .jsonPath("$.lugarNacimiento")
            .value(is(DEFAULT_LUGAR_NACIMIENTO))
            .jsonPath("$.fechaNacimiento")
            .value(is(DEFAULT_FECHA_NACIMIENTO.toString()))
            .jsonPath("$.callePrincipal")
            .value(is(DEFAULT_CALLE_PRINCIPAL))
            .jsonPath("$.numeroCasa")
            .value(is(DEFAULT_NUMERO_CASA))
            .jsonPath("$.calleSecundaria")
            .value(is(DEFAULT_CALLE_SECUNDARIA))
            .jsonPath("$.barrio")
            .value(is(DEFAULT_BARRIO))
            .jsonPath("$.referenciaDomicilio")
            .value(is(DEFAULT_REFERENCIA_DOMICILIO))
            .jsonPath("$.seguroSaludSecundario")
            .value(is(DEFAULT_SEGURO_SALUD_SECUNDARIO))
            .jsonPath("$.identificacionRepresentante")
            .value(is(DEFAULT_IDENTIFICACION_REPRESENTANTE));
    }

    @Test
    void getNonExistingPaciente() {
        // Get the paciente
        webTestClient
            .get()
            .uri(ENTITY_API_URL_ID, Long.MAX_VALUE)
            .accept(MediaType.APPLICATION_PROBLEM_JSON)
            .exchange()
            .expectStatus()
            .isNotFound();
    }

    @Test
    void putExistingPaciente() throws Exception {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();

        // Update the paciente
        Paciente updatedPaciente = pacienteRepository.findById(paciente.getId()).block();
        updatedPaciente
            .lugarNacimiento(UPDATED_LUGAR_NACIMIENTO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .callePrincipal(UPDATED_CALLE_PRINCIPAL)
            .numeroCasa(UPDATED_NUMERO_CASA)
            .calleSecundaria(UPDATED_CALLE_SECUNDARIA)
            .barrio(UPDATED_BARRIO)
            .referenciaDomicilio(UPDATED_REFERENCIA_DOMICILIO)
            .seguroSaludSecundario(UPDATED_SEGURO_SALUD_SECUNDARIO)
            .identificacionRepresentante(UPDATED_IDENTIFICACION_REPRESENTANTE);
        PacienteDTO pacienteDTO = pacienteMapper.toDto(updatedPaciente);

        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, pacienteDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getLugarNacimiento()).isEqualTo(UPDATED_LUGAR_NACIMIENTO);
        assertThat(testPaciente.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testPaciente.getCallePrincipal()).isEqualTo(UPDATED_CALLE_PRINCIPAL);
        assertThat(testPaciente.getNumeroCasa()).isEqualTo(UPDATED_NUMERO_CASA);
        assertThat(testPaciente.getCalleSecundaria()).isEqualTo(UPDATED_CALLE_SECUNDARIA);
        assertThat(testPaciente.getBarrio()).isEqualTo(UPDATED_BARRIO);
        assertThat(testPaciente.getReferenciaDomicilio()).isEqualTo(UPDATED_REFERENCIA_DOMICILIO);
        assertThat(testPaciente.getSeguroSaludSecundario()).isEqualTo(UPDATED_SEGURO_SALUD_SECUNDARIO);
        assertThat(testPaciente.getIdentificacionRepresentante()).isEqualTo(UPDATED_IDENTIFICACION_REPRESENTANTE);
    }

    @Test
    void putNonExistingPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, pacienteDTO.getId())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithIdMismatchPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void putWithMissingIdPathParamPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .put()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.APPLICATION_JSON)
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void partialUpdatePacienteWithPatch() throws Exception {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();

        // Update the paciente using partial update
        Paciente partialUpdatedPaciente = new Paciente();
        partialUpdatedPaciente.setId(paciente.getId());

        partialUpdatedPaciente
            .callePrincipal(UPDATED_CALLE_PRINCIPAL)
            .numeroCasa(UPDATED_NUMERO_CASA)
            .calleSecundaria(UPDATED_CALLE_SECUNDARIA);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPaciente.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPaciente))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getLugarNacimiento()).isEqualTo(DEFAULT_LUGAR_NACIMIENTO);
        assertThat(testPaciente.getFechaNacimiento()).isEqualTo(DEFAULT_FECHA_NACIMIENTO);
        assertThat(testPaciente.getCallePrincipal()).isEqualTo(UPDATED_CALLE_PRINCIPAL);
        assertThat(testPaciente.getNumeroCasa()).isEqualTo(UPDATED_NUMERO_CASA);
        assertThat(testPaciente.getCalleSecundaria()).isEqualTo(UPDATED_CALLE_SECUNDARIA);
        assertThat(testPaciente.getBarrio()).isEqualTo(DEFAULT_BARRIO);
        assertThat(testPaciente.getReferenciaDomicilio()).isEqualTo(DEFAULT_REFERENCIA_DOMICILIO);
        assertThat(testPaciente.getSeguroSaludSecundario()).isEqualTo(DEFAULT_SEGURO_SALUD_SECUNDARIO);
        assertThat(testPaciente.getIdentificacionRepresentante()).isEqualTo(DEFAULT_IDENTIFICACION_REPRESENTANTE);
    }

    @Test
    void fullUpdatePacienteWithPatch() throws Exception {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();

        // Update the paciente using partial update
        Paciente partialUpdatedPaciente = new Paciente();
        partialUpdatedPaciente.setId(paciente.getId());

        partialUpdatedPaciente
            .lugarNacimiento(UPDATED_LUGAR_NACIMIENTO)
            .fechaNacimiento(UPDATED_FECHA_NACIMIENTO)
            .callePrincipal(UPDATED_CALLE_PRINCIPAL)
            .numeroCasa(UPDATED_NUMERO_CASA)
            .calleSecundaria(UPDATED_CALLE_SECUNDARIA)
            .barrio(UPDATED_BARRIO)
            .referenciaDomicilio(UPDATED_REFERENCIA_DOMICILIO)
            .seguroSaludSecundario(UPDATED_SEGURO_SALUD_SECUNDARIO)
            .identificacionRepresentante(UPDATED_IDENTIFICACION_REPRESENTANTE);

        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, partialUpdatedPaciente.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(partialUpdatedPaciente))
            .exchange()
            .expectStatus()
            .isOk();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
        Paciente testPaciente = pacienteList.get(pacienteList.size() - 1);
        assertThat(testPaciente.getLugarNacimiento()).isEqualTo(UPDATED_LUGAR_NACIMIENTO);
        assertThat(testPaciente.getFechaNacimiento()).isEqualTo(UPDATED_FECHA_NACIMIENTO);
        assertThat(testPaciente.getCallePrincipal()).isEqualTo(UPDATED_CALLE_PRINCIPAL);
        assertThat(testPaciente.getNumeroCasa()).isEqualTo(UPDATED_NUMERO_CASA);
        assertThat(testPaciente.getCalleSecundaria()).isEqualTo(UPDATED_CALLE_SECUNDARIA);
        assertThat(testPaciente.getBarrio()).isEqualTo(UPDATED_BARRIO);
        assertThat(testPaciente.getReferenciaDomicilio()).isEqualTo(UPDATED_REFERENCIA_DOMICILIO);
        assertThat(testPaciente.getSeguroSaludSecundario()).isEqualTo(UPDATED_SEGURO_SALUD_SECUNDARIO);
        assertThat(testPaciente.getIdentificacionRepresentante()).isEqualTo(UPDATED_IDENTIFICACION_REPRESENTANTE);
    }

    @Test
    void patchNonExistingPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, pacienteDTO.getId())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithIdMismatchPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL_ID, longCount.incrementAndGet())
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isBadRequest();

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void patchWithMissingIdPathParamPaciente() throws Exception {
        int databaseSizeBeforeUpdate = pacienteRepository.findAll().collectList().block().size();
        paciente.setId(longCount.incrementAndGet());

        // Create the Paciente
        PacienteDTO pacienteDTO = pacienteMapper.toDto(paciente);

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        webTestClient
            .patch()
            .uri(ENTITY_API_URL)
            .contentType(MediaType.valueOf("application/merge-patch+json"))
            .bodyValue(TestUtil.convertObjectToJsonBytes(pacienteDTO))
            .exchange()
            .expectStatus()
            .isEqualTo(405);

        // Validate the Paciente in the database
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    void deletePaciente() {
        // Initialize the database
        pacienteRepository.save(paciente).block();

        int databaseSizeBeforeDelete = pacienteRepository.findAll().collectList().block().size();

        // Delete the paciente
        webTestClient
            .delete()
            .uri(ENTITY_API_URL_ID, paciente.getId())
            .accept(MediaType.APPLICATION_JSON)
            .exchange()
            .expectStatus()
            .isNoContent();

        // Validate the database contains one less item
        List<Paciente> pacienteList = pacienteRepository.findAll().collectList().block();
        assertThat(pacienteList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
