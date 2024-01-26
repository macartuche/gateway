package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Discapacidad;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.DiscapacidadRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the Discapacidad entity.
 */
@SuppressWarnings("unused")
class DiscapacidadRepositoryInternalImpl extends SimpleR2dbcRepository<Discapacidad, Long> implements DiscapacidadRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CatalogoItemRowMapper catalogoitemMapper;
    private final DiscapacidadRowMapper discapacidadMapper;

    private static final Table entityTable = Table.aliased("discapacidad", EntityManager.ENTITY_ALIAS);
    private static final Table tipoTable = Table.aliased("catalogo_item", "tipo");
    private static final Table estadoTable = Table.aliased("catalogo_item", "estado");

    public DiscapacidadRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CatalogoItemRowMapper catalogoitemMapper,
        DiscapacidadRowMapper discapacidadMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Discapacidad.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.catalogoitemMapper = catalogoitemMapper;
        this.discapacidadMapper = discapacidadMapper;
    }

    @Override
    public Flux<Discapacidad> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Discapacidad> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = DiscapacidadSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoTable, "tipo"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(estadoTable, "estado"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(tipoTable)
            .on(Column.create("tipo_id", entityTable))
            .equals(Column.create("id", tipoTable))
            .leftOuterJoin(estadoTable)
            .on(Column.create("estado_id", entityTable))
            .equals(Column.create("id", estadoTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Discapacidad.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Discapacidad> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Discapacidad> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Discapacidad> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Discapacidad> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Discapacidad> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Discapacidad process(Row row, RowMetadata metadata) {
        Discapacidad entity = discapacidadMapper.apply(row, "e");
        entity.setTipo(catalogoitemMapper.apply(row, "tipo"));
        entity.setEstado(catalogoitemMapper.apply(row, "estado"));
        return entity;
    }

    @Override
    public <S extends Discapacidad> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
