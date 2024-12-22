import { useState } from "react"
import { Category } from "../types/Category";
import { createCategory } from "../services/categoryService";

export const useCreateCategory = () => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{message: string} | null>(null); 

    const createCategoryHandler = async (categoryData: Category) => {
        setLoading(true);

        try {
            await createCategory(categoryData);
            setErrors(null);
            setLoading(false);
            return true;
        } catch (error) {
            setErrors(error instanceof Error ? error : {message: "Failed to create the category"});
            setLoading(false);
            return false;
        }
    }

    return {createCategoryHandler, loading, errors};
}