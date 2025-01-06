import { useNavigate } from "react-router-dom";
import { useListOfPosts } from "../../hooks/useListOfPosts";
import { PostType } from "../../types/PostType";
import Button from "../button/Button";

interface TableCrudProps {
  list: PostType[];
}

const TableCrud: React.FC<TableCrudProps> = ({ list }) => {
    const navigate = useNavigate();

    const handleEdit = (post: PostType) => {
        navigate(`/post-edit/${post.id}`, { state: { postData: post } });
    };

  return (
    <table>
      <tr>
        <td>Title</td>
        <td>Status</td>
        <td colSpan={2}>Actions</td>
      </tr>
      {list.map((post, index) => (
        <tr key={index}>
          <td>{post.title}</td>
          <td>{post.status}</td>
          <td>
            <button onClick={() => {handleEdit(post)}}>Edit</button>
          </td>
          <td>
            <Button>Delete</Button>
          </td>
        </tr>
      ))}
    </table>
  );
};

const PostManager: React.FC = () => {
  const { listOfPosts, statusFetchingPosts } = useListOfPosts();
  const navigate = useNavigate();
  return (
    <div>
      <h1>So what you want to do?</h1>
      <p>
        Here's the list of all current posts registered, you can edit delete or
        click above to create a new one.
      </p>
      <Button handleClick={() => { navigate('/post-create') }}>Create new</Button>
      <div>
        {statusFetchingPosts === "success" ? (
          <TableCrud list={listOfPosts} />
        ) : (
          <p>{statusFetchingPosts}</p>
        )}
      </div>
    </div>
  );
};

export default PostManager;
