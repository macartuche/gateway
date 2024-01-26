package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Especialidad;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.EspecialidadRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the Especialidad entity.
 */
@SuppressWarnings("unused")
class EspecialidadRepositoryInternalImpl extends SimpleR2dbcRepository<Especialidad, Long> implements EspecialidadRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CatalogoItemRowMapper catalogoitemMapper;
    private final EspecialidadRowMapper especialidadMapper;

    private static final Table entityTable = Table.aliased("especialidad", EntityManager.ENTITY_ALIAS);
    private static final Table tipoTable = Table.aliased("catalogo_item", "tipo");

    public EspecialidadRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CatalogoItemRowMapper catalogoitemMapper,
        EspecialidadRowMapper especialidadMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Especialidad.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.catalogoitemMapper = catalogoitemMapper;
        this.especialidadMapper = especialidadMapper;
    }

    @Override
    public Flux<Especialidad> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Especialidad> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = EspecialidadSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoTable, "tipo"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(tipoTable)
            .on(Column.create("tipo_id", entityTable))
            .equals(Column.create("id", tipoTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Especialidad.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Especialidad> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Especialidad> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Especialidad> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Especialidad> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Especialidad> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Especialidad process(Row row, RowMetadata metadata) {
        Especialidad entity = especialidadMapper.apply(row, "e");
        entity.setTipo(catalogoitemMapper.apply(row, "tipo"));
        return entity;
    }

    @Override
    public <S extends Especialidad> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
