import React, { createContext, useContext, useState, useEffect } from 'react';
import { fetchCategories } from '../../services/categoryService';
import { CategoryType } from '../../types/CategoryType';

interface CategoriesContextType {
  categories: CategoryType[];
  setCategories: React.Dispatch<React.SetStateAction<CategoryType[]>>;
  loadingCategories: boolean;
  errorCategories: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [errorCategories, setErrorCategories] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoadingCategories(true);
        const categoriesFetched = await fetchCategories();
        setCategories(categoriesFetched);
      } catch (error) {
        setLoadingCategories(false);
        setErrorCategories("Failed to fetch the categories");
        console.error("Failed to fetch the categories", error);
      } finally {
        setLoadingCategories(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, loadingCategories, errorCategories }}>
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
