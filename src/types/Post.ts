import { Category } from "./Category"
import { Tag } from "./Tag"

export type Post = {
    title: String,
    description?: String,
    content: String,
    status: boolean,
    tags?: Tag[],
    category: Category
}