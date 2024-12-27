import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchCategories } from '../../services/categoryService';
import { Category } from '../../types/Category';

interface CategoriesContextType {
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
  loading: boolean;
  error: string | null;
}

const CategoriesContext = createContext<CategoriesContextType | undefined>(undefined);

export const CategoriesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const categoriesFetched = await fetchCategories();
        setCategories(categoriesFetched);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setError("Failed to fetch the categories");
        console.error("Failed to fetch the categories", error);
      }
    }

    loadCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, loading, error }}>
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
