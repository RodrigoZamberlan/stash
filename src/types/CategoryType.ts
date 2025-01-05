import { PostType } from "./PostType";

export type CategoryType = {
    id?: number,
    name: string,
    posts?: PostType[]
}