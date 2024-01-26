package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Paciente;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.DiscapacidadRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.PacienteRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.ParroquiaTerritorioRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.PersonaRowMapper;
import io.r2dbc.spi.Row;
import io.r2dbc.spi.RowMetadata;
import java.util.List;
import org.springframework.data.domain.Pageable;
import org.springframework.data.r2dbc.convert.R2dbcConverter;
import org.springframework.data.r2dbc.core.R2dbcEntityOperations;
import org.springframework.data.r2dbc.core.R2dbcEntityTemplate;
import org.springframework.data.r2dbc.repository.support.SimpleR2dbcRepository;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Comparison;
import org.springframework.data.relational.core.sql.Condition;
import org.springframework.data.relational.core.sql.Conditions;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Select;
import org.springframework.data.relational.core.sql.SelectBuilder.SelectFromAndJoinCondition;
import org.springframework.data.relational.core.sql.Table;
import org.springframework.data.relational.repository.support.MappingRelationalEntityInformation;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.r2dbc.core.RowsFetchSpec;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

/**
 * Spring Data R2DBC custom repository implementation for the Paciente entity.
 */
@SuppressWarnings("unused")
class PacienteRepositoryInternalImpl extends SimpleR2dbcRepository<Paciente, Long> implements PacienteRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final DiscapacidadRowMapper discapacidadMapper;
    private final PersonaRowMapper personaMapper;
    private final ParroquiaTerritorioRowMapper parroquiaterritorioMapper;
    private final CatalogoItemRowMapper catalogoitemMapper;
    private final PacienteRowMapper pacienteMapper;

    private static final Table entityTable = Table.aliased("paciente", EntityManager.ENTITY_ALIAS);
    private static final Table discapacidadTable = Table.aliased("discapacidad", "discapacidad");
    private static final Table personaTable = Table.aliased("persona", "persona");
    private static final Table parroquiaNacimientoTable = Table.aliased("parroquia_territorio", "parroquiaNacimiento");
    private static final Table parroquiaResidenciaTable = Table.aliased("parroquia_territorio", "parroquiaResidencia");
    private static final Table autoidentificacionEtnicaTable = Table.aliased("catalogo_item", "autoidentificacionEtnica");
    private static final Table nacionalidadEtnicaTable = Table.aliased("catalogo_item", "nacionalidadEtnica");
    private static final Table puebloTable = Table.aliased("catalogo_item", "pueblo");
    private static final Table tipoEmpresaTrabajoTable = Table.aliased("catalogo_item", "tipoEmpresaTrabajo");
    private static final Table profesionOcupacionTable = Table.aliased("catalogo_item", "profesionOcupacion");
    private static final Table seguroSaludPrincipalTable = Table.aliased("catalogo_item", "seguroSaludPrincipal");
    private static final Table tipoBonoTable = Table.aliased("catalogo_item", "tipoBono");
    private static final Table procedenciaRepresentanteTable = Table.aliased("catalogo_item", "procedenciaRepresentante");

    public PacienteRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        DiscapacidadRowMapper discapacidadMapper,
        PersonaRowMapper personaMapper,
        ParroquiaTerritorioRowMapper parroquiaterritorioMapper,
        CatalogoItemRowMapper catalogoitemMapper,
        PacienteRowMapper pacienteMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Paciente.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.discapacidadMapper = discapacidadMapper;
        this.personaMapper = personaMapper;
        this.parroquiaterritorioMapper = parroquiaterritorioMapper;
        this.catalogoitemMapper = catalogoitemMapper;
        this.pacienteMapper = pacienteMapper;
    }

    @Override
    public Flux<Paciente> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Paciente> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = PacienteSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(DiscapacidadSqlHelper.getColumns(discapacidadTable, "discapacidad"));
        columns.addAll(PersonaSqlHelper.getColumns(personaTable, "persona"));
        columns.addAll(ParroquiaTerritorioSqlHelper.getColumns(parroquiaNacimientoTable, "parroquiaNacimiento"));
        columns.addAll(ParroquiaTerritorioSqlHelper.getColumns(parroquiaResidenciaTable, "parroquiaResidencia"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(autoidentificacionEtnicaTable, "autoidentificacionEtnica"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(nacionalidadEtnicaTable, "nacionalidadEtnica"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(puebloTable, "pueblo"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoEmpresaTrabajoTable, "tipoEmpresaTrabajo"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(profesionOcupacionTable, "profesionOcupacion"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(seguroSaludPrincipalTable, "seguroSaludPrincipal"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoBonoTable, "tipoBono"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(procedenciaRepresentanteTable, "procedenciaRepresentante"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(discapacidadTable)
            .on(Column.create("discapacidad_id", entityTable))
            .equals(Column.create("id", discapacidadTable))
            .leftOuterJoin(personaTable)
            .on(Column.create("persona_id", entityTable))
            .equals(Column.create("id", personaTable))
            .leftOuterJoin(parroquiaNacimientoTable)
            .on(Column.create("parroquia_nacimiento_id", entityTable))
            .equals(Column.create("id", parroquiaNacimientoTable))
            .leftOuterJoin(parroquiaResidenciaTable)
            .on(Column.create("parroquia_residencia_id", entityTable))
            .equals(Column.create("id", parroquiaResidenciaTable))
            .leftOuterJoin(autoidentificacionEtnicaTable)
            .on(Column.create("autoidentificacion_etnica_id", entityTable))
            .equals(Column.create("id", autoidentificacionEtnicaTable))
            .leftOuterJoin(nacionalidadEtnicaTable)
            .on(Column.create("nacionalidad_etnica_id", entityTable))
            .equals(Column.create("id", nacionalidadEtnicaTable))
            .leftOuterJoin(puebloTable)
            .on(Column.create("pueblo_id", entityTable))
            .equals(Column.create("id", puebloTable))
            .leftOuterJoin(tipoEmpresaTrabajoTable)
            .on(Column.create("tipo_empresa_trabajo_id", entityTable))
            .equals(Column.create("id", tipoEmpresaTrabajoTable))
            .leftOuterJoin(profesionOcupacionTable)
            .on(Column.create("profesion_ocupacion_id", entityTable))
            .equals(Column.create("id", profesionOcupacionTable))
            .leftOuterJoin(seguroSaludPrincipalTable)
            .on(Column.create("seguro_salud_principal_id", entityTable))
            .equals(Column.create("id", seguroSaludPrincipalTable))
            .leftOuterJoin(tipoBonoTable)
            .on(Column.create("tipo_bono_id", entityTable))
            .equals(Column.create("id", tipoBonoTable))
            .leftOuterJoin(procedenciaRepresentanteTable)
            .on(Column.create("procedencia_representante_id", entityTable))
            .equals(Column.create("id", procedenciaRepresentanteTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Paciente.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Paciente> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Paciente> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Paciente> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Paciente> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Paciente> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Paciente process(Row row, RowMetadata metadata) {
        Paciente entity = pacienteMapper.apply(row, "e");
        entity.setDiscapacidad(discapacidadMapper.apply(row, "discapacidad"));
        entity.setPersona(personaMapper.apply(row, "persona"));
        entity.setParroquiaNacimiento(parroquiaterritorioMapper.apply(row, "parroquiaNacimiento"));
        entity.setParroquiaResidencia(parroquiaterritorioMapper.apply(row, "parroquiaResidencia"));
        entity.setAutoidentificacionEtnica(catalogoitemMapper.apply(row, "autoidentificacionEtnica"));
        entity.setNacionalidadEtnica(catalogoitemMapper.apply(row, "nacionalidadEtnica"));
        entity.setPueblo(catalogoitemMapper.apply(row, "pueblo"));
        entity.setTipoEmpresaTrabajo(catalogoitemMapper.apply(row, "tipoEmpresaTrabajo"));
        entity.setProfesionOcupacion(catalogoitemMapper.apply(row, "profesionOcupacion"));
        entity.setSeguroSaludPrincipal(catalogoitemMapper.apply(row, "seguroSaludPrincipal"));
        entity.setTipoBono(catalogoitemMapper.apply(row, "tipoBono"));
        entity.setProcedenciaRepresentante(catalogoitemMapper.apply(row, "procedenciaRepresentante"));
        return entity;
    }

    @Override
    public <S extends Paciente> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
