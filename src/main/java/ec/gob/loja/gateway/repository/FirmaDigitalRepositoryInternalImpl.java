package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.FirmaDigital;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.FirmaDigitalRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the FirmaDigital entity.
 */
@SuppressWarnings("unused")
class FirmaDigitalRepositoryInternalImpl extends SimpleR2dbcRepository<FirmaDigital, Long> implements FirmaDigitalRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CatalogoItemRowMapper catalogoitemMapper;
    private final PersonaRowMapper personaMapper;
    private final FirmaDigitalRowMapper firmadigitalMapper;

    private static final Table entityTable = Table.aliased("firma_digital", EntityManager.ENTITY_ALIAS);
    private static final Table tipoTable = Table.aliased("catalogo_item", "tipo");
    private static final Table personaTable = Table.aliased("persona", "persona");

    public FirmaDigitalRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CatalogoItemRowMapper catalogoitemMapper,
        PersonaRowMapper personaMapper,
        FirmaDigitalRowMapper firmadigitalMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(FirmaDigital.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.catalogoitemMapper = catalogoitemMapper;
        this.personaMapper = personaMapper;
        this.firmadigitalMapper = firmadigitalMapper;
    }

    @Override
    public Flux<FirmaDigital> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<FirmaDigital> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = FirmaDigitalSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoTable, "tipo"));
        columns.addAll(PersonaSqlHelper.getColumns(personaTable, "persona"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(tipoTable)
            .on(Column.create("tipo_id", entityTable))
            .equals(Column.create("id", tipoTable))
            .leftOuterJoin(personaTable)
            .on(Column.create("persona_id", entityTable))
            .equals(Column.create("id", personaTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, FirmaDigital.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<FirmaDigital> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<FirmaDigital> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<FirmaDigital> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<FirmaDigital> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<FirmaDigital> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private FirmaDigital process(Row row, RowMetadata metadata) {
        FirmaDigital entity = firmadigitalMapper.apply(row, "e");
        entity.setTipo(catalogoitemMapper.apply(row, "tipo"));
        entity.setPersona(personaMapper.apply(row, "persona"));
        return entity;
    }

    @Override
    public <S extends FirmaDigital> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
