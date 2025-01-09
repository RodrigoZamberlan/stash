import { useNavigate } from "react-router-dom";
import { useListOfPosts } from "../../hooks/useListOfPosts";
import { PostType } from "../../types/PostType";
import Button from "../button/Button";
import { deletePost, getPost } from "../../services/PostService";
import { useEffect } from "react";
import Table from "../table/Table";

interface TableCrudProps {
  list: PostType[];
}

const TableCrud: React.FC<TableCrudProps> = ({ list }) => {
    const navigate = useNavigate();

    const handleEdit = async (post: PostType) => {
      if (post.id) {
        try {
          const postData = await getPost(post.id);
          console.log("post data", postData);
          navigate(`/post-edit/${post.id}`, { state: { postData: postData } });
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleDelete = async (post: PostType) => {
      if (post.id) {
        try {
          console.log(post.id);
          const response = await deletePost(post.id);
          console.log(response);
        } catch (error) {
          console.error(error instanceof Error ? error.message : "Fail to delete the post");
        }
      }
    }

  return (
    <Table id="table-posts" fieldsName={["Title", "Status"]} fieldsContent={[1, "active"]} handleEdit={handleEdit} handleDelete={handleDelete}/>
  );
};

const PostManager: React.FC = () => {
  const { listOfPosts, statusFetchingPosts } = useListOfPosts();
  const navigate = useNavigate();

  useEffect(() => {
    const updateListOfPosts = async () => {
      
    }
  }, []);

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
