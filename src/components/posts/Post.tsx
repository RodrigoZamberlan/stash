import { PostType } from "../../types/PostType";
import styles from "./Post.module.css";

interface PostProps {
    post: PostType
}

const maxLengthContent = 105;

const Post: React.FC<PostProps> = ({post}) => {
    if (post.link) {
        return (
            <a href={post.link} target="_blank" rel="noreferrer">
                <div className={styles.post}>
                    <div className={styles.category}>{post.categoryName}</div>
                    <img src={post.coverImage} alt={post.description} />
                    <div className={styles.textContent}>
                        <h3>{post.title}</h3>
                        <p>{post.content.length <= maxLengthContent ? post.content : `${post.content.slice(0, maxLengthContent)}...`}</p>
                    </div>
                </div>
            </a>
        )
    }

    return <p>This posts dosent have a link, only posts with link for now</p>
}

export default Post;