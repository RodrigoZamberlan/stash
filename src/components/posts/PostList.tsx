import styles from "./Post.module.css";
import Post from "./Post";
import { useListOfPosts } from "../../hooks/useListOfPosts";

const PostList: React.FC = () => {
    const { listOfPosts, statusFetchingPosts } = useListOfPosts();
    const listOfActivePosts = listOfPosts.filter(post => post.status === "active");

    if ( listOfActivePosts.length === 0) {
        return (<p className={styles.message}>No post's yet to show</p>);
    }

    return (<div className={styles.listOfPosts}>
        {statusFetchingPosts === "success" ?
            listOfActivePosts.map((post, index) => (<div key={index}><Post post={post}/></div>))
        : <p>{statusFetchingPosts}</p>}
    </div>)
}

export default PostList;