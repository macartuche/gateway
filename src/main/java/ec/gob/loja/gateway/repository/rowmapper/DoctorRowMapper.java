package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.Doctor;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Doctor}, with proper type conversions.
 */
@Service
public class DoctorRowMapper implements BiFunction<Row, String, Doctor> {

    private final ColumnConverter converter;

    public DoctorRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Doctor} stored in the database.
     */
    @Override
    public Doctor apply(Row row, String prefix) {
        Doctor entity = new Doctor();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setCodigo(converter.fromRow(row, prefix + "_codigo", String.class));
        entity.setActivo(converter.fromRow(row, prefix + "_activo", Boolean.class));
        entity.setPersonaId(converter.fromRow(row, prefix + "_persona_id", Long.class));
        return entity;
    }
}
