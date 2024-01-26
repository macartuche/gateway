package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.ProvinciaTerritorio;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link ProvinciaTerritorio}, with proper type conversions.
 */
@Service
public class ProvinciaTerritorioRowMapper implements BiFunction<Row, String, ProvinciaTerritorio> {

    private final ColumnConverter converter;

    public ProvinciaTerritorioRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link ProvinciaTerritorio} stored in the database.
     */
    @Override
    public ProvinciaTerritorio apply(Row row, String prefix) {
        ProvinciaTerritorio entity = new ProvinciaTerritorio();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setCodigo(converter.fromRow(row, prefix + "_codigo", String.class));
        entity.setNombre(converter.fromRow(row, prefix + "_nombre", String.class));
        entity.setPais(converter.fromRow(row, prefix + "_pais", String.class));
        return entity;
    }
}
