package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Doctor;
import ec.gob.loja.gateway.repository.rowmapper.DoctorRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the Doctor entity.
 */
@SuppressWarnings("unused")
class DoctorRepositoryInternalImpl extends SimpleR2dbcRepository<Doctor, Long> implements DoctorRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final PersonaRowMapper personaMapper;
    private final DoctorRowMapper doctorMapper;

    private static final Table entityTable = Table.aliased("doctor", EntityManager.ENTITY_ALIAS);
    private static final Table personaTable = Table.aliased("persona", "persona");

    public DoctorRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        PersonaRowMapper personaMapper,
        DoctorRowMapper doctorMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Doctor.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.personaMapper = personaMapper;
        this.doctorMapper = doctorMapper;
    }

    @Override
    public Flux<Doctor> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Doctor> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = DoctorSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(PersonaSqlHelper.getColumns(personaTable, "persona"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(personaTable)
            .on(Column.create("persona_id", entityTable))
            .equals(Column.create("id", personaTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Doctor.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Doctor> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Doctor> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Doctor> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Doctor> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Doctor> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Doctor process(Row row, RowMetadata metadata) {
        Doctor entity = doctorMapper.apply(row, "e");
        entity.setPersona(personaMapper.apply(row, "persona"));
        return entity;
    }

    @Override
    public <S extends Doctor> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
