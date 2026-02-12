"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Category } from "@/types";
import { CATEGORIES as INITIAL_CATEGORIES } from "@/lib/mock-data";
import { slugify } from "@/lib/utils";

interface CategoriesContextType {
  categories: Category[];
  addCategory: (name: string, description: string) => void;
  updateCategory: (id: string, name: string, description: string) => void;
  removeCategory: (id: string) => void;
}

const CategoriesContext = createContext<CategoriesContextType>({
  categories: INITIAL_CATEGORIES,
  addCategory: () => {},
  updateCategory: () => {},
  removeCategory: () => {},
});

export function CategoriesProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);

  function addCategory(name: string, description: string) {
    const newCategory: Category = {
      id: `c_${Date.now()}`,
      name,
      slug: slugify(name),
      description,
    };
    setCategories((prev) => [...prev, newCategory]);
  }

  function updateCategory(id: string, name: string, description: string) {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === id ? { ...cat, name, slug: slugify(name), description } : cat
      )
    );
  }

  function removeCategory(id: string) {
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
  }

  return (
    <CategoriesContext.Provider value={{ categories, addCategory, updateCategory, removeCategory }}>
      {children}
    </CategoriesContext.Provider>
  );
}

export function useCategories() {
  return useContext(CategoriesContext);
}
