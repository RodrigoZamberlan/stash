import { useNavigate } from "react-router-dom";
import { useListOfPosts } from "../../hooks/useListOfPosts";
import { PostType } from "../../types/PostType";
import Button from "../button/Button";
import { deletePost, getPost } from "../../services/PostService";
import Table from "../table/Table";
import HeaderPosts from "./HeaderPosts";

const PostManager: React.FC = () => {
  const { listOfPosts, setListOfPosts, statusFetchingPosts } = useListOfPosts();
  const navigate = useNavigate();

  const handleEdit = async (post: PostType) => {
    if (post.id) {
      try {
        const postData = await getPost(post.id);
        navigate(`/post-edit/${post.id}`, { state: { postData: postData } });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleDelete = async (post: PostType) => {
    if (post.id) {
      try {
        await deletePost(post.id);
        setListOfPosts(prevPosts => prevPosts.filter((p) => p.id !== post.id));
      } catch (error) {
        console.error(error instanceof Error ? error.message : "Fail to delete the post");
      }
    }
  }

  return (
    <div>
      <HeaderPosts/>
      <h1>So what you want to do?</h1>
      <p>
        Here's the list of all current posts registered, you can edit delete or
        click above to create a new one.
      </p>
      <Button handleClick={() => { navigate('/post-create') }}>Create new</Button>
      <div>
        {statusFetchingPosts === "success" ? (
          <Table 
            columns={[
              {key: "id", label: "ID"},
              {key: "title", label: "Title"},
              {key: "status", label: "Status"}]} 
            data={listOfPosts} 
            onEdit={handleEdit} 
            onDelete={handleDelete}></Table>
        ) : (
          <p>{statusFetchingPosts}</p>
        )}
      </div>
    </div>
  );
};

export default PostManager;
