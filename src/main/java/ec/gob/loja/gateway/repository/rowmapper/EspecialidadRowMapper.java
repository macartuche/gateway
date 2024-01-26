package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.Especialidad;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Especialidad}, with proper type conversions.
 */
@Service
public class EspecialidadRowMapper implements BiFunction<Row, String, Especialidad> {

    private final ColumnConverter converter;

    public EspecialidadRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Especialidad} stored in the database.
     */
    @Override
    public Especialidad apply(Row row, String prefix) {
        Especialidad entity = new Especialidad();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setNombre(converter.fromRow(row, prefix + "_nombre", String.class));
        entity.setActiva(converter.fromRow(row, prefix + "_activa", Boolean.class));
        entity.setTipoId(converter.fromRow(row, prefix + "_tipo_id", Long.class));
        return entity;
    }
}
