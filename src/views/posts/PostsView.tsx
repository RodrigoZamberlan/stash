import styles from "./PostView.module.css";
import PostList from "../../components/posts/PostList";
import HeaderPosts from "../../components/posts/HeaderPosts";

const PostsView: React.FC = () => {
    return (<>
        <HeaderPosts/>
        <div className={styles.postPage}>
            <div className={styles.introSection}>
                <h1>Explore the World's <br/>Largest Post's List</h1>
                <p>Here you will see a entire list of post's that was registered on the Stash, being possible to find contents of many subjects that you are intersting. So go ahead and explore and if you didn't find what you are looking for just simply add your own post here.</p>
            </div>
            <PostList />
        </div>
    </>)
}

export default PostsView;