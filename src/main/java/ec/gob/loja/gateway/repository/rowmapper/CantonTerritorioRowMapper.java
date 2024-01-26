package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.CantonTerritorio;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link CantonTerritorio}, with proper type conversions.
 */
@Service
public class CantonTerritorioRowMapper implements BiFunction<Row, String, CantonTerritorio> {

    private final ColumnConverter converter;

    public CantonTerritorioRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link CantonTerritorio} stored in the database.
     */
    @Override
    public CantonTerritorio apply(Row row, String prefix) {
        CantonTerritorio entity = new CantonTerritorio();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setCodigo(converter.fromRow(row, prefix + "_codigo", String.class));
        entity.setNombre(converter.fromRow(row, prefix + "_nombre", String.class));
        entity.setProvinciaId(converter.fromRow(row, prefix + "_provincia_id", Long.class));
        return entity;
    }
}
