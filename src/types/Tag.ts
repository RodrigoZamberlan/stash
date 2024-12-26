import { Post } from "./Post";

export type Tag = {
    name: string,
    posts?: Post[]
}