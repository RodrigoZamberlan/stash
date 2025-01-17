import styles from "./Post.module.css";
import { useListOfPosts } from "../../hooks/useListOfPosts";
import InputUncontrolled from "../input/InputUncontrolled";
import { useRef, useState } from "react";
import { PostType } from "../../types/PostType";
import Post from "./Post";


const PostList: React.FC = () => {
    const { listOfPosts, statusFetchingPosts } = useListOfPosts();
    const listOfActivePosts = listOfPosts.filter(post => post.status === "active");
    const searchTerm = useRef<HTMLInputElement | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<PostType[] | null>(null);

    const handleSearchResults = (searchTerm: string | undefined) => {
        if (searchTerm && searchTerm.length > 0) {
            setFilteredPosts(listOfActivePosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())))
        } else {
            setFilteredPosts(listOfActivePosts);
        }
    }

    if (statusFetchingPosts !== "success") {
        return (<p className={styles.message}>{statusFetchingPosts}</p>);
    }
    
    if ( listOfActivePosts.length === 0) {
        return (<p className={styles.message}>No post's yet to show</p>);
    }

    if (filteredPosts !== null && filteredPosts.length === 0) {
        return (<p className={styles.message}>No results found</p>);
    }

    return (<>
        <div className={styles.wrapperSearch}>
            <InputUncontrolled ref={searchTerm} id="search-term-post" placeholder="Find what you are looking for"/>
            <button onClick={() => handleSearchResults(searchTerm.current?.value)}>Search</button>
        </div>

        <div className={styles.listOfPosts}>
            {filteredPosts === null && listOfActivePosts.map((post, index) => (<div key={index}><Post post={post}/></div>))}
            {filteredPosts !== null && filteredPosts.length > 0 ? filteredPosts.map((post, index) => (<div key={index}><Post post={post}/></div>)) : "No results found"}
        </div>
    </>)
}

export default PostList;