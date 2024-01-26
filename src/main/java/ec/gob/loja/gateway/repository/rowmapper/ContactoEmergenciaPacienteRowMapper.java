package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.ContactoEmergenciaPaciente;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link ContactoEmergenciaPaciente}, with proper type conversions.
 */
@Service
public class ContactoEmergenciaPacienteRowMapper implements BiFunction<Row, String, ContactoEmergenciaPaciente> {

    private final ColumnConverter converter;

    public ContactoEmergenciaPacienteRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link ContactoEmergenciaPaciente} stored in the database.
     */
    @Override
    public ContactoEmergenciaPaciente apply(Row row, String prefix) {
        ContactoEmergenciaPaciente entity = new ContactoEmergenciaPaciente();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setNombre(converter.fromRow(row, prefix + "_nombre", String.class));
        entity.setTelefono(converter.fromRow(row, prefix + "_telefono", String.class));
        entity.setDireccion(converter.fromRow(row, prefix + "_direccion", String.class));
        entity.setPacienteId(converter.fromRow(row, prefix + "_paciente_id", Long.class));
        entity.setParentezcoId(converter.fromRow(row, prefix + "_parentezco_id", Long.class));
        return entity;
    }
}
