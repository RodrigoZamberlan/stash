import styles from "./Post.module.css";
import { useListOfPosts } from "../../hooks/useListOfPosts";
import InputUncontrolled from "../input/InputUncontrolled";
import { useRef, useState } from "react";
import { PostType } from "../../types/PostType";
import Post from "./Post";
import Button from "../button/Button";


const PostList: React.FC = () => {
    const { listOfPosts, statusFetchingPosts } = useListOfPosts();
    const listOfActivePosts = listOfPosts.filter(post => post.status === "active");
    const searchTerm = useRef<HTMLInputElement | null>(null);
    const [filteredPosts, setFilteredPosts] = useState<PostType[] | null>(null);
    let message: string = "";

    const handleSearchResults = (searchTerm: string | undefined) => {
        if (searchTerm && searchTerm.length > 0) {
            setFilteredPosts(listOfActivePosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase())))
        } else {
            setFilteredPosts(listOfActivePosts);
        }
    }

    if (statusFetchingPosts !== "success") {
        message = statusFetchingPosts;
    }
    
    if ( listOfActivePosts.length === 0) {
        message = "No post's yet to show";
    }

    if (filteredPosts !== null && filteredPosts.length === 0) {
        message = "No results found";
    }

    return (<>
        <div className={styles.wrapperSearch}>
            <InputUncontrolled ref={searchTerm} id="search-term-post" placeholder="Find what you are looking for"/>
            <Button handleClick={() => handleSearchResults(searchTerm.current?.value)}>Search</Button>
        </div>

        <div className={styles.listOfPosts}>
            {filteredPosts === null && listOfActivePosts.map((post, index) => (<div key={index}><Post post={post}/></div>))}
            {filteredPosts !== null && filteredPosts.length > 0 ? filteredPosts.map((post, index) => (<div key={index}><Post post={post}/></div>)) : ""}
            {message.length > 0 ? message : ""}
        </div>
    </>)
}

export default PostList;