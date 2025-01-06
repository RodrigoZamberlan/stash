type PostTagType = {
    tagId: number;
}

export type PostType = {
    id?: number,
    title: string,
    coverImage: string,
    description?: string,
    content: string,
    status: string,
    postTags?: PostTagType[],
    categoryId: number,
    userId: number,
    link?: string
}