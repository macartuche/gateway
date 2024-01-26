package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.CantonTerritorio;
import ec.gob.loja.gateway.repository.rowmapper.CantonTerritorioRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.ProvinciaTerritorioRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the CantonTerritorio entity.
 */
@SuppressWarnings("unused")
class CantonTerritorioRepositoryInternalImpl
    extends SimpleR2dbcRepository<CantonTerritorio, Long>
    implements CantonTerritorioRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final ProvinciaTerritorioRowMapper provinciaterritorioMapper;
    private final CantonTerritorioRowMapper cantonterritorioMapper;

    private static final Table entityTable = Table.aliased("canton_territorio", EntityManager.ENTITY_ALIAS);
    private static final Table provinciaTable = Table.aliased("provincia_territorio", "provincia");

    public CantonTerritorioRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        ProvinciaTerritorioRowMapper provinciaterritorioMapper,
        CantonTerritorioRowMapper cantonterritorioMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(CantonTerritorio.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.provinciaterritorioMapper = provinciaterritorioMapper;
        this.cantonterritorioMapper = cantonterritorioMapper;
    }

    @Override
    public Flux<CantonTerritorio> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<CantonTerritorio> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = CantonTerritorioSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(ProvinciaTerritorioSqlHelper.getColumns(provinciaTable, "provincia"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(provinciaTable)
            .on(Column.create("provincia_id", entityTable))
            .equals(Column.create("id", provinciaTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, CantonTerritorio.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<CantonTerritorio> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<CantonTerritorio> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<CantonTerritorio> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<CantonTerritorio> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<CantonTerritorio> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private CantonTerritorio process(Row row, RowMetadata metadata) {
        CantonTerritorio entity = cantonterritorioMapper.apply(row, "e");
        entity.setProvincia(provinciaterritorioMapper.apply(row, "provincia"));
        return entity;
    }

    @Override
    public <S extends CantonTerritorio> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
