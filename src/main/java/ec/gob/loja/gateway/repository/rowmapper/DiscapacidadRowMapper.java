package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.Discapacidad;
import io.r2dbc.spi.Row;
import java.math.BigDecimal;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Discapacidad}, with proper type conversions.
 */
@Service
public class DiscapacidadRowMapper implements BiFunction<Row, String, Discapacidad> {

    private final ColumnConverter converter;

    public DiscapacidadRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Discapacidad} stored in the database.
     */
    @Override
    public Discapacidad apply(Row row, String prefix) {
        Discapacidad entity = new Discapacidad();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setPorcentaje(converter.fromRow(row, prefix + "_porcentaje", BigDecimal.class));
        entity.setTipoId(converter.fromRow(row, prefix + "_tipo_id", Long.class));
        entity.setEstadoId(converter.fromRow(row, prefix + "_estado_id", Long.class));
        return entity;
    }
}
