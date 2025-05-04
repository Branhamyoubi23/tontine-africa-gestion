
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";

type Column<T> = {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  className?: string;
};

type DataTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  keyExtractor: (item: T) => string | number;
  actions?: {
    edit?: (item: T) => void;
    delete?: (item: T) => void;
  };
  className?: string;
};

function DataTable<T>({
  data,
  columns,
  keyExtractor,
  actions,
  className,
}: DataTableProps<T>) {
  return (
    <div className={`w-full overflow-auto ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead 
                key={index} 
                className={column.className}
              >
                {column.header}
              </TableHead>
            ))}
            {actions && <TableHead>Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions ? 1 : 0)}
                className="h-24 text-center"
              >
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          ) : (
            data.map((item) => (
              <TableRow key={keyExtractor(item)}>
                {columns.map((column, columnIndex) => (
                  <TableCell 
                    key={columnIndex} 
                    className={column.className}
                  >
                    {typeof column.accessor === "function"
                      ? column.accessor(item)
                      : (item[column.accessor] as React.ReactNode)}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell className="flex space-x-2">
                    {actions.edit && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => actions.edit && actions.edit(item)}
                      >
                        <Edit size={16} />
                      </Button>
                    )}
                    {actions.delete && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => actions.delete && actions.delete(item)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default DataTable;
