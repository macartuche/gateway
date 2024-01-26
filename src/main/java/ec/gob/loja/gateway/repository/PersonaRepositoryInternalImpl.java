package ec.gob.loja.gateway.repository;

import ec.gob.loja.gateway.domain.Persona;
import ec.gob.loja.gateway.repository.rowmapper.CatalogoItemRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.PersonaRowMapper;
import ec.gob.loja.gateway.repository.rowmapper.UserRowMapper;
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
 * Spring Data R2DBC custom repository implementation for the Persona entity.
 */
@SuppressWarnings("unused")
class PersonaRepositoryInternalImpl extends SimpleR2dbcRepository<Persona, Long> implements PersonaRepositoryInternal {

    private final DatabaseClient db;
    private final R2dbcEntityTemplate r2dbcEntityTemplate;
    private final EntityManager entityManager;

    private final CatalogoItemRowMapper catalogoitemMapper;
    private final UserRowMapper userMapper;
    private final PersonaRowMapper personaMapper;

    private static final Table entityTable = Table.aliased("persona", EntityManager.ENTITY_ALIAS);
    private static final Table tipoIdentificacionTable = Table.aliased("catalogo_item", "tipoIdentificacion");
    private static final Table nacionalidadTable = Table.aliased("catalogo_item", "nacionalidad");
    private static final Table usuarioTable = Table.aliased("jhi_user", "usuario");
    private static final Table generoTable = Table.aliased("catalogo_item", "genero");
    private static final Table estadoCivilTable = Table.aliased("catalogo_item", "estadoCivil");
    private static final Table nivelEducacionTable = Table.aliased("catalogo_item", "nivelEducacion");
    private static final Table estadoNivelEducacionTable = Table.aliased("catalogo_item", "estadoNivelEducacion");

    public PersonaRepositoryInternalImpl(
        R2dbcEntityTemplate template,
        EntityManager entityManager,
        CatalogoItemRowMapper catalogoitemMapper,
        UserRowMapper userMapper,
        PersonaRowMapper personaMapper,
        R2dbcEntityOperations entityOperations,
        R2dbcConverter converter
    ) {
        super(
            new MappingRelationalEntityInformation(converter.getMappingContext().getRequiredPersistentEntity(Persona.class)),
            entityOperations,
            converter
        );
        this.db = template.getDatabaseClient();
        this.r2dbcEntityTemplate = template;
        this.entityManager = entityManager;
        this.catalogoitemMapper = catalogoitemMapper;
        this.userMapper = userMapper;
        this.personaMapper = personaMapper;
    }

    @Override
    public Flux<Persona> findAllBy(Pageable pageable) {
        return createQuery(pageable, null).all();
    }

    RowsFetchSpec<Persona> createQuery(Pageable pageable, Condition whereClause) {
        List<Expression> columns = PersonaSqlHelper.getColumns(entityTable, EntityManager.ENTITY_ALIAS);
        columns.addAll(CatalogoItemSqlHelper.getColumns(tipoIdentificacionTable, "tipoIdentificacion"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(nacionalidadTable, "nacionalidad"));
        columns.addAll(UserSqlHelper.getColumns(usuarioTable, "usuario"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(generoTable, "genero"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(estadoCivilTable, "estadoCivil"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(nivelEducacionTable, "nivelEducacion"));
        columns.addAll(CatalogoItemSqlHelper.getColumns(estadoNivelEducacionTable, "estadoNivelEducacion"));
        SelectFromAndJoinCondition selectFrom = Select
            .builder()
            .select(columns)
            .from(entityTable)
            .leftOuterJoin(tipoIdentificacionTable)
            .on(Column.create("tipo_identificacion_id", entityTable))
            .equals(Column.create("id", tipoIdentificacionTable))
            .leftOuterJoin(nacionalidadTable)
            .on(Column.create("nacionalidad_id", entityTable))
            .equals(Column.create("id", nacionalidadTable))
            .leftOuterJoin(usuarioTable)
            .on(Column.create("usuario_id", entityTable))
            .equals(Column.create("id", usuarioTable))
            .leftOuterJoin(generoTable)
            .on(Column.create("genero_id", entityTable))
            .equals(Column.create("id", generoTable))
            .leftOuterJoin(estadoCivilTable)
            .on(Column.create("estado_civil_id", entityTable))
            .equals(Column.create("id", estadoCivilTable))
            .leftOuterJoin(nivelEducacionTable)
            .on(Column.create("nivel_educacion_id", entityTable))
            .equals(Column.create("id", nivelEducacionTable))
            .leftOuterJoin(estadoNivelEducacionTable)
            .on(Column.create("estado_nivel_educacion_id", entityTable))
            .equals(Column.create("id", estadoNivelEducacionTable));
        // we do not support Criteria here for now as of https://github.com/jhipster/generator-jhipster/issues/18269
        String select = entityManager.createSelect(selectFrom, Persona.class, pageable, whereClause);
        return db.sql(select).map(this::process);
    }

    @Override
    public Flux<Persona> findAll() {
        return findAllBy(null);
    }

    @Override
    public Mono<Persona> findById(Long id) {
        Comparison whereClause = Conditions.isEqual(entityTable.column("id"), Conditions.just(id.toString()));
        return createQuery(null, whereClause).one();
    }

    @Override
    public Mono<Persona> findOneWithEagerRelationships(Long id) {
        return findById(id);
    }

    @Override
    public Flux<Persona> findAllWithEagerRelationships() {
        return findAll();
    }

    @Override
    public Flux<Persona> findAllWithEagerRelationships(Pageable page) {
        return findAllBy(page);
    }

    private Persona process(Row row, RowMetadata metadata) {
        Persona entity = personaMapper.apply(row, "e");
        entity.setTipoIdentificacion(catalogoitemMapper.apply(row, "tipoIdentificacion"));
        entity.setNacionalidad(catalogoitemMapper.apply(row, "nacionalidad"));
        entity.setUsuario(userMapper.apply(row, "usuario"));
        entity.setGenero(catalogoitemMapper.apply(row, "genero"));
        entity.setEstadoCivil(catalogoitemMapper.apply(row, "estadoCivil"));
        entity.setNivelEducacion(catalogoitemMapper.apply(row, "nivelEducacion"));
        entity.setEstadoNivelEducacion(catalogoitemMapper.apply(row, "estadoNivelEducacion"));
        return entity;
    }

    @Override
    public <S extends Persona> Mono<S> save(S entity) {
        return super.save(entity);
    }
}
