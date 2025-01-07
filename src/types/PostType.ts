import { TagType } from "./TagType"

export type PostType = {
    id?: number,
    title: string,
    coverImage: string,
    description?: string,
    content: string,
    status: string,
    postTags?: TagType[],
    categoryId: number,
    categoryName?: string,
    userId: number,
    link?: string
}