package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import ec.gob.loja.gateway.repository.rowmapper.CantonTerritorioRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.ParroquiaTerritorioRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the ParroquiaTerritorio entity.
 */
@SuppressWarnings("unused")
class ParroquiaTerritorioRepositoryInternalImpl
    extends SimpleR2dbcRepository<ParroquiaTerritorio, Long>
    implements ParroquiaTerritorioRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CantonTerritorioRowMapper cantonterritorioMapper;
    private final ParroquiaTerritorioRowMapper parroquiaterritorioMapper;

    private static final Table entityTable = Table.aliased("parroquia_territorio", EntityManager.ENTITY_ALIAS);
    private static final Table cantonTable = Table.aliased("canton_territorio", "canton");

    public ParroquiaTerritorioRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CantonTerritorioRowMapper cantonterritorioMapper,
        ParroquiaTerritorioRowMapper parroquiaterritorioMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(ParroquiaTerritorio.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.cantonterritorioMapper = cantonterritorioMapper;
        this.parroquiaterritorioMapper = parroquiaterritorioMapper;
    }

    @Override
    public Flux<ParroquiaTerritorio> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<ParroquiaTerritorio> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = ParroquiaTerritorioSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CantonTerritorioSqlHelper.getColumns(cantonTable, "canton"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(cantonTable)
            .on(Column.create("canton_id", entityTable))
            .equals(Column.create("id", cantonTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, ParroquiaTerritorio.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<ParroquiaTerritorio> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<ParroquiaTerritorio> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<ParroquiaTerritorio> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<ParroquiaTerritorio> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<ParroquiaTerritorio> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private ParroquiaTerritorio process(Row row, RowMetadata metadata) {
        ParroquiaTerritorio entity = parroquiaterritorioMapper.apply(row, "e");
        entity.setCanton(cantonterritorioMapper.apply(row, "canton"));
        return entity;
    }

    @Override
    public <S extends ParroquiaTerritorio> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
