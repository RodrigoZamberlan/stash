import { Post } from "./Post";

export type Tag = {
    id?: number,
    name: string,
    posts?: Post[]
}