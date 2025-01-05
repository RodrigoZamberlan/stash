import { PostType } from "../../types/PostType";
import styles from "./Post.module.css";

interface PostProps {
    post: PostType
}

const Post: React.FC<PostProps> = ({post}) => {
    return <div className={styles.post}>
        <img src={post.coverImage} alt={post.description} />
        <div className={styles.textContent}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
        </div>
    </div>
}

export default Post;