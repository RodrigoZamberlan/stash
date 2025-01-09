import { useState } from "react";
import { CategoryType } from "../types/CategoryType";
import { createCategory } from "../services/categoryService";

export const useCreateCategory = () => {
    const [statusCreatingCategory, setStatusCreatingCategory] = useState("idle");

    const createCategoryHandler = async (categoryData: CategoryType) => {
        try {
            setStatusCreatingCategory("loading...");
            await createCategory(categoryData);
            setStatusCreatingCategory("success");
        } catch (error) {
            setStatusCreatingCategory(error instanceof Error ? error.message : "Fail to create the category");
        }
    }

    return {createCategoryHandler, statusCreatingCategory};
}