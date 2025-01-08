export interface PostCrudType {
    id?: number;
    title: string;
    coverImage: string;
    description: string;
    content: string;
    categoryId: number;
    status: string;
    tagsId: number[];
    userId: number;
    link: string;
}
