import Button from "../button/Button";

interface TableProps<T> {
    data: T[];
    columns: { key: keyof T; label: string}[];
    onEdit: (item: T) => void;
    onDelete: (item: T) => void;
}

const Table = <T,>({ data, columns, onEdit, onDelete }: TableProps<T>) => {
    return (
      <table style={{ width: "90%", borderCollapse: "collapse", margin: "auto" }}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={String(column.key)} style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>
                {column.label}
              </th>
            ))}
            <th style={{ border: "1px solid black", padding: "8px", textAlign: "right" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column) => (
                <td key={String(column.key)} style={{ border: "1px solid black", padding: "8px", textAlign: "left" }}>
                  {String(item[column.key])}
                </td>
              ))}
                <td style={{ border: "1px solid black", padding: "8px", justifyContent: "end", display: "flex", gap: "8px"}}>
                    {onEdit && <Button handleClick={() => onEdit(item)}>Edit</Button>}
                    {onDelete && (
                    <Button handleClick={() => onDelete(item)}>
                        Delete
                    </Button>
                    )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default Table;