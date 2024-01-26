package ec.gob.loja.gateway.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class PacienteSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("lugar_nacimiento", table, columnPrefix + "_lugar_nacimiento"));
        columns.add(Column.aliased("fecha_nacimiento", table, columnPrefix + "_fecha_nacimiento"));
        columns.add(Column.aliased("calle_principal", table, columnPrefix + "_calle_principal"));
        columns.add(Column.aliased("numero_casa", table, columnPrefix + "_numero_casa"));
        columns.add(Column.aliased("calle_secundaria", table, columnPrefix + "_calle_secundaria"));
        columns.add(Column.aliased("barrio", table, columnPrefix + "_barrio"));
        columns.add(Column.aliased("referencia_domicilio", table, columnPrefix + "_referencia_domicilio"));
        columns.add(Column.aliased("seguro_salud_secundario", table, columnPrefix + "_seguro_salud_secundario"));
        columns.add(Column.aliased("identificacion_representante", table, columnPrefix + "_identificacion_representante"));

        columns.add(Column.aliased("discapacidad_id", table, columnPrefix + "_discapacidad_id"));
        columns.add(Column.aliased("persona_id", table, columnPrefix + "_persona_id"));
        columns.add(Column.aliased("parroquia_nacimiento_id", table, columnPrefix + "_parroquia_nacimiento_id"));
        columns.add(Column.aliased("parroquia_residencia_id", table, columnPrefix + "_parroquia_residencia_id"));
        columns.add(Column.aliased("autoidentificacion_etnica_id", table, columnPrefix + "_autoidentificacion_etnica_id"));
        columns.add(Column.aliased("nacionalidad_etnica_id", table, columnPrefix + "_nacionalidad_etnica_id"));
        columns.add(Column.aliased("pueblo_id", table, columnPrefix + "_pueblo_id"));
        columns.add(Column.aliased("tipo_empresa_trabajo_id", table, columnPrefix + "_tipo_empresa_trabajo_id"));
        columns.add(Column.aliased("profesion_ocupacion_id", table, columnPrefix + "_profesion_ocupacion_id"));
        columns.add(Column.aliased("seguro_salud_principal_id", table, columnPrefix + "_seguro_salud_principal_id"));
        columns.add(Column.aliased("tipo_bono_id", table, columnPrefix + "_tipo_bono_id"));
        columns.add(Column.aliased("procedencia_representante_id", table, columnPrefix + "_procedencia_representante_id"));
        return columns;
    }
}
