import Button from "../button/Button";

interface TableProps {
    id: string,
    fieldsName: string[],
    fieldsContent: Array<number | string>,
    handleEdit: (content: any) => void;
    handleDelete: (content: any) => void;
}

const Table: React.FC<TableProps> = ({id, fieldsName, fieldsContent, handleEdit, handleDelete}) => {
    return (
        <table id={id}>
            <thead>
                {fieldsName.map((name, index) => (<td key={index}>{name}</td>))}
                <td colSpan={2}>Actions</td>
            </thead>
            <tbody>
                {fieldsContent.map((content, index) => (<tr key={index}>{content}</tr>))}
                <tr>
                    <Button handleClick={handleEdit}>Edit</Button>
                </tr>
                <tr>
                    <Button handleClick={handleEdit}>Delete</Button>
                </tr>
            </tbody>
        </table>
    )
}

export default Table;