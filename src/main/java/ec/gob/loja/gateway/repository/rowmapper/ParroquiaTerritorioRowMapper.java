package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.ParroquiaTerritorio;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link ParroquiaTerritorio}, with proper type conversions.
 */
@Service
public class ParroquiaTerritorioRowMapper implements BiFunction<Row, String, ParroquiaTerritorio> {

    private final ColumnConverter converter;

    public ParroquiaTerritorioRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link ParroquiaTerritorio} stored in the database.
     */
    @Override
    public ParroquiaTerritorio apply(Row row, String prefix) {
        ParroquiaTerritorio entity = new ParroquiaTerritorio();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setCodigo(converter.fromRow(row, prefix + "_codigo", String.class));
        entity.setNombre(converter.fromRow(row, prefix + "_nombre", String.class));
        entity.setCantonId(converter.fromRow(row, prefix + "_canton_id", Long.class));
        return entity;
    }
}
