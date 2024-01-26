package ec.gob.loja.gateway.repository;

import java.util.ArrayList;
import java.util.List;
import org.springframework.data.relational.core.sql.Column;
import org.springframework.data.relational.core.sql.Expression;
import org.springframework.data.relational.core.sql.Table;

public class FirmaDigitalSqlHelper {

    public static List<Expression> getColumns(Table table, String columnPrefix) {
        List<Expression> columns = new ArrayList<>();
        columns.add(Column.aliased("id", table, columnPrefix + "_id"));
        columns.add(Column.aliased("fecha_desde", table, columnPrefix + "_fecha_desde"));
        columns.add(Column.aliased("fecha_hasta", table, columnPrefix + "_fecha_hasta"));
        columns.add(Column.aliased("path", table, columnPrefix + "_path"));

        columns.add(Column.aliased("tipo_id", table, columnPrefix + "_tipo_id"));
        columns.add(Column.aliased("persona_id", table, columnPrefix + "_persona_id"));
        return columns;
    }
}
