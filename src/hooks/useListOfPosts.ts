import { useEffect, useState } from "react";
import { fetchPosts } from "../services/PostService";
import { PostType } from "../types/PostType";

type FilterFunction = (post: PostType) => boolean;

export const useListOfPosts = (filterFn?: FilterFunction) => {
    const [listOfPosts, setListOfPosts] = useState<PostType[]>([]);
    const [statusFetchingPosts, setStatusFetchingPosts] = useState("idle");
    const [filteredPosts, setFilteredPosts] = useState<PostType[]>([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                setStatusFetchingPosts("loading...");
                const listFetched = await fetchPosts();
                setListOfPosts(listFetched);
                setStatusFetchingPosts("success");
            } catch (error) {
                setStatusFetchingPosts(
                    error instanceof Error ? error.message : "Error fetching the posts"
                );
            }
        };

        getPosts();
    }, []);

    useEffect(() => {
        if (filterFn) {
            setFilteredPosts(listOfPosts.filter(filterFn));
        } else {
            setFilteredPosts(listOfPosts);
        }
    }, [listOfPosts, filterFn]);

    return { listOfPosts, filteredPosts, setListOfPosts, statusFetchingPosts };
};