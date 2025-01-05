type PostTagType = {
    tagId: number;
}

export type PostType = {
    title: string,
    coverImage: string,
    description?: string,
    content: string,
    status: string,
    postTags?: PostTagType[],
    categoryId: number,
    userId: number
}