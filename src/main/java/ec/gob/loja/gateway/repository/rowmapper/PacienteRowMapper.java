package ec.gob.loja.gateway.repository.rowmapper;

import ec.gob.loja.gateway.domain.Paciente;
import io.r2dbc.spi.Row;
import java.time.LocalDate;
import java.util.function.BiFunction;
import org.springframework.stereotype.Service;

/**
 * Converter between {@link Row} to {@link Paciente}, with proper type conversions.
 */
@Service
public class PacienteRowMapper implements BiFunction<Row, String, Paciente> {

    private final ColumnConverter converter;

    public PacienteRowMapper(ColumnConverter converter) {
        this.converter = converter;
    }

    /**
     * Take a {@link Row} and a column prefix, and extract all the fields.
     * @return the {@link Paciente} stored in the database.
     */
    @Override
    public Paciente apply(Row row, String prefix) {
        Paciente entity = new Paciente();
        entity.setId(converter.fromRow(row, prefix + "_id", Long.class));
        entity.setLugarNacimiento(converter.fromRow(row, prefix + "_lugar_nacimiento", String.class));
        entity.setFechaNacimiento(converter.fromRow(row, prefix + "_fecha_nacimiento", LocalDate.class));
        entity.setCallePrincipal(converter.fromRow(row, prefix + "_calle_principal", String.class));
        entity.setNumeroCasa(converter.fromRow(row, prefix + "_numero_casa", String.class));
        entity.setCalleSecundaria(converter.fromRow(row, prefix + "_calle_secundaria", String.class));
        entity.setBarrio(converter.fromRow(row, prefix + "_barrio", String.class));
        entity.setReferenciaDomicilio(converter.fromRow(row, prefix + "_referencia_domicilio", String.class));
        entity.setSeguroSaludSecundario(converter.fromRow(row, prefix + "_seguro_salud_secundario", String.class));
        entity.setIdentificacionRepresentante(converter.fromRow(row, prefix + "_identificacion_representante", String.class));
        entity.setDiscapacidadId(converter.fromRow(row, prefix + "_discapacidad_id", Long.class));
        entity.setPersonaId(converter.fromRow(row, prefix + "_persona_id", Long.class));
        entity.setParroquiaNacimientoId(converter.fromRow(row, prefix + "_parroquia_nacimiento_id", Long.class));
        entity.setParroquiaResidenciaId(converter.fromRow(row, prefix + "_parroquia_residencia_id", Long.class));
        entity.setAutoidentificacionEtnicaId(converter.fromRow(row, prefix + "_autoidentificacion_etnica_id", Long.class));
        entity.setNacionalidadEtnicaId(converter.fromRow(row, prefix + "_nacionalidad_etnica_id", Long.class));
        entity.setPuebloId(converter.fromRow(row, prefix + "_pueblo_id", Long.class));
        entity.setTipoEmpresaTrabajoId(converter.fromRow(row, prefix + "_tipo_empresa_trabajo_id", Long.class));
        entity.setProfesionOcupacionId(converter.fromRow(row, prefix + "_profesion_ocupacion_id", Long.class));
        entity.setSeguroSaludPrincipalId(converter.fromRow(row, prefix + "_seguro_salud_principal_id", Long.class));
        entity.setTipoBonoId(converter.fromRow(row, prefix + "_tipo_bono_id", Long.class));
        entity.setProcedenciaRepresentanteId(converter.fromRow(row, prefix + "_procedencia_representante_id", Long.class));
        return entity;
    }
}
