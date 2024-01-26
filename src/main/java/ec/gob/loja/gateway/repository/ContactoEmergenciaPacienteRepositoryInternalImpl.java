package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.ContactoEmergenciaPacienteRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.PacienteRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the ContactoEmergenciaPaciente entity.
 */
@SuppressWarnings("unused")
class ContactoEmergenciaPacienteRepositoryInternalImpl
    extends SimpleR2dbcRepository<ContactoEmergenciaPaciente, Long>
    implements ContactoEmergenciaPacienteRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final PacienteRowMapper pacienteMapper;
    private final CatalogoItemRowMapper catalogoitemMapper;
    private final ContactoEmergenciaPacienteRowMapper contactoemergenciapacienteMapper;

    private static final Table entityTable = Table.aliased("contacto_emergencia_paciente", EntityManager.ENTITY_ALIAS);
    private static final Table pacienteTable = Table.aliased("paciente", "paciente");
    private static final Table parentezcoTable = Table.aliased("catalogo_item", "parentezco");

    public ContactoEmergenciaPacienteRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        PacienteRowMapper pacienteMapper,
        CatalogoItemRowMapper catalogoitemMapper,
        ContactoEmergenciaPacienteRowMapper contactoemergenciapacienteMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(
                converter.getMappingContext().getRequiredPersistentEntity(ContactoEmergenciaPaciente.class)
            ),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.pacienteMapper = pacienteMapper;
        this.catalogoitemMapper = catalogoitemMapper;
        this.contactoemergenciapacienteMapper = contactoemergenciapacienteMapper;
    }

    @Override
    public Flux<ContactoEmergenciaPaciente> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<ContactoEmergenciaPaciente> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = ContactoEmergenciaPacienteSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(PacienteSqlHelper.getColumns(pacienteTable, "paciente"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(parentezcoTable, "parentezco"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(pacienteTable)
            .on(Column.create("paciente_id", entityTable))
            .equals(Column.create("id", pacienteTable))
            .leftOuterJoin(parentezcoTable)
            .on(Column.create("parentezco_id", entityTable))
            .equals(Column.create("id", parentezcoTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, ContactoEmergenciaPaciente.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<ContactoEmergenciaPaciente> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<ContactoEmergenciaPaciente> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<ContactoEmergenciaPaciente> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<ContactoEmergenciaPaciente> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private ContactoEmergenciaPaciente process(Row row, RowMetadata metadata) {
        ContactoEmergenciaPaciente entity = contactoemergenciapacienteMapper.apply(row, "e");
        entity.setPaciente(pacienteMapper.apply(row, "paciente"));
        entity.setParentezco(catalogoitemMapper.apply(row, "parentezco"));
        return entity;
    }

    @Override
    public <S extends ContactoEmergenciaPaciente> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
