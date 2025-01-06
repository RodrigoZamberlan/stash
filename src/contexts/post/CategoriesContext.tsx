import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '../../services/categoryService';
import { CategoryType } from '../../types/CategoryType';

interface CategoriesContextType {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  statusFetchingCategories: string;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [statusFetchingCategories, setStatusFetchingCategories] = useState("idle");

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setStatusFetchingCategories("loading...");
        const categoriesFetched = await fetchCategories();
        setCategories(categoriesFetched);

        if (categoriesFetched.length === 0) {
          setStatusFetchingCategories("The list of categories is empty. Create one first!"); 
        } else {
          setStatusFetchingCategories("success");
        }
      } catch (error) {
        setStatusFetchingCategories(error instanceof Error ? error.message : "Failed to fetch the categories");
      }
    }

    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, statusFetchingCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = (): CategoriesContextType => {
  const context = useContext(CategoriesContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoriesProvider');
  }
  return context;
};
