package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.Persona;
import io.r2dbc.spi.Row;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Persona}, with proper type conversions.
 */
@Service
public class PersonaRowMapper implements BiFunction<Row, String, Persona> {

    private final ColumnConverter converter;

    public PersonaRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Persona} stored in the database.
     */
    @Override
    public Persona apply(Row row, String prefix) {
        Persona entity = new Persona();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setIdentificacion(converter.fromRow(row, prefix + "_identificacion", String.class));
        entity.setPrimerApellido(converter.fromRow(row, prefix + "_primer_apellido", String.class));
        entity.setSegundoApellido(converter.fromRow(row, prefix + "_segundo_apellido", String.class));
        entity.setPrimerNombre(converter.fromRow(row, prefix + "_primer_nombre", String.class));
        entity.setSegundoNombre(converter.fromRow(row, prefix + "_segundo_nombre", String.class));
        entity.setCelular(converter.fromRow(row, prefix + "_celular", String.class));
        entity.setTelefonoConvencional(converter.fromRow(row, prefix + "_telefono_convencional", String.class));
        entity.setCorreo(converter.fromRow(row, prefix + "_correo", String.class));
        entity.setTipoIdentificacionId(converter.fromRow(row, prefix + "_tipo_identificacion_id", Long.class));
        entity.setNacionalidadId(converter.fromRow(row, prefix + "_nacionalidad_id", Long.class));
        entity.setUsuarioId(converter.fromRow(row, prefix + "_usuario_id", Long.class));
        entity.setGeneroId(converter.fromRow(row, prefix + "_genero_id", Long.class));
        entity.setEstadoCivilId(converter.fromRow(row, prefix + "_estado_civil_id", Long.class));
        entity.setNivelEducacionId(converter.fromRow(row, prefix + "_nivel_educacion_id", Long.class));
        entity.setEstadoNivelEducacionId(converter.fromRow(row, prefix + "_estado_nivel_educacion_id", Long.class));
        return entity;
    }
}
