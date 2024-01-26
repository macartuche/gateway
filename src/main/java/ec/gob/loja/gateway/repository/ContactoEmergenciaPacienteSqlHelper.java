package ec.gob.loja.gateway.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class ContactoEmergenciaPacienteSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("nombre", table, columnPrefix + "_nombre"));
        columns.add(Column.aliased("telefono", table, columnPrefix + "_telefono"));
        columns.add(Column.aliased("direccion", table, columnPrefix + "_direccion"));

        columns.add(Column.aliased("paciente_id", table, columnPrefix + "_paciente_id"));
        columns.add(Column.aliased("parentezco_id", table, columnPrefix + "_parentezco_id"));
        return columns;
    }
}
