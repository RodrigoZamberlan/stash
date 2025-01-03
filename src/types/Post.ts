type PostTag = {
    tagId: number;
}

export type Post = {
    title: string,
    description?: string,
    content: string,
    status: string,
    postTags?: PostTag[],
    categoryId: number,
    userId: number
}