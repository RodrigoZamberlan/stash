import { useEffect, useState } from "react";
import { fetchPosts } from "../services/PostService"
import { PostType } from "../types/PostType";

export const useListOfPosts = () => {
    const [listOfPosts, setListOfPosts] = useState<PostType[]>([]);
    const [statusFetchingPosts, setStatusFetchingPosts] = useState("idle");

    useEffect(() => {
        const getPosts = async () => {
            try {
                setStatusFetchingPosts("loading...");
                const listFetched = await fetchPosts();
                setListOfPosts(listFetched);
                console.log(listFetched);
                setStatusFetchingPosts("success");
            } catch (error) {
                setStatusFetchingPosts(error instanceof Error ? error.message : "Error fetching the post's")
            }
        }
    
        getPosts();
    }, []);

    return { listOfPosts, statusFetchingPosts }
}