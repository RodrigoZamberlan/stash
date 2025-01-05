import { useEffect, useState } from "react";
import { PostType } from "../../types/PostType";
import { fetchPosts } from "../../services/PostService";
import styles from "./Post.module.css";
import Post from "./Post";

const PostList: React.FC = () => {
    const [listOfPosts, setListOfPosts] = useState<PostType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error ,setError] = useState<string | null>(null);

    useEffect(() => {
        const getAllPosts = async () => {
            try {
                setLoading(true);
                const allPosts = await fetchPosts();
                setListOfPosts(allPosts);
                setLoading(false);
            } catch (error) {
                setError(error instanceof Error ? error.message : "Error to fetch the posts");
                setLoading(false);
            } 
        }

        getAllPosts();
    }, []);

    return <div className={styles.listOfPosts}>
        {listOfPosts.length === 0 && <p>No post's yet! Go ahead and create the first one.</p>}
        {loading ? <p>Loading</p> : listOfPosts.map((post, index) => (<div key={index}><Post post={post}/></div>))}
        {error && <p>{error}</p>}
    </div>
}

export default PostList;