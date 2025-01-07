import styles from "./Post.module.css";
import Post from "./Post";
import { useListOfPosts } from "../../hooks/useListOfPosts";

const PostList: React.FC = () => {
    const { listOfPosts, statusFetchingPosts } = useListOfPosts();

    return <div className={styles.listOfPosts}>
        {statusFetchingPosts === "success" ? listOfPosts.map((post, index) => (<div key={index}><Post post={post}/></div>)) : <p>{statusFetchingPosts}</p>}
    </div>
}

export default PostList;