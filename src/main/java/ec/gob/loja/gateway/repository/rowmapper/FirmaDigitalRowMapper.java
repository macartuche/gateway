package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.FirmaDigital;
import io.r2dbc.spi.Row;
import java.time.LocalDate;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link FirmaDigital}, with proper type conversions.
 */
@Service
public class FirmaDigitalRowMapper implements BiFunction<Row, String, FirmaDigital> {

    private final ColumnConverter converter;

    public FirmaDigitalRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link FirmaDigital} stored in the database.
     */
    @Override
    public FirmaDigital apply(Row row, String prefix) {
        FirmaDigital entity = new FirmaDigital();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setFechaDesde(converter.fromRow(row, prefix + "_fecha_desde", LocalDate.class));
        entity.setFechaHasta(converter.fromRow(row, prefix + "_fecha_hasta", LocalDate.class));
        entity.setPath(converter.fromRow(row, prefix + "_path", String.class));
        entity.setTipoId(converter.fromRow(row, prefix + "_tipo_id", Long.class));
        entity.setPersonaId(converter.fromRow(row, prefix + "_persona_id", Long.class));
        return entity;
    }
}
