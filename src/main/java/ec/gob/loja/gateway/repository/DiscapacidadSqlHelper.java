package ec.gob.loja.gateway.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class DiscapacidadSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("porcentaje", table, columnPrefix + "_porcentaje"));

        columns.add(Column.aliased("tipo_id", table, columnPrefix + "_tipo_id"));
        columns.add(Column.aliased("estado_id", table, columnPrefix + "_estado_id"));
        return columns;
    }
}
