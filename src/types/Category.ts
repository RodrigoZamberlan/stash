import { Post } from "./Post";

export type Category = {
    id?: number,
    name: string,
    posts?: Post[]
}