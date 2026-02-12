"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Ministry } from "@/types";
import { MINISTRIES as INITIAL_MINISTRIES } from "@/lib/mock-data";

interface MinistriesContextType {
  ministries: Ministry[];
  addMinistry: (name: string, abbreviation: string, description: string) => void;
  updateMinistry: (id: string, name: string, abbreviation: string, description: string) => void;
  removeMinistry: (id: string) => void;
}

const MinistriesContext = createContext<MinistriesContextType>({
  ministries: INITIAL_MINISTRIES,
  addMinistry: () => {},
  updateMinistry: () => {},
  removeMinistry: () => {},
});

export function MinistriesProvider({ children }: { children: ReactNode }) {
  const [ministries, setMinistries] = useState<Ministry[]>(INITIAL_MINISTRIES);

  function addMinistry(name: string, abbreviation: string, description: string) {
    const newMinistry: Ministry = {
      id: `m_${Date.now()}`,
      name,
      abbreviation,
      description,
      created_at: new Date().toISOString(),
    };
    setMinistries((prev) => [...prev, newMinistry]);
  }

  function updateMinistry(id: string, name: string, abbreviation: string, description: string) {
    setMinistries((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, name, abbreviation, description } : m
      )
    );
  }

  function removeMinistry(id: string) {
    setMinistries((prev) => prev.filter((m) => m.id !== id));
  }

  return (
    <MinistriesContext.Provider value={{ ministries, addMinistry, updateMinistry, removeMinistry }}>
      {children}
    </MinistriesContext.Provider>
  );
}

export function useMinistries() {
  return useContext(MinistriesContext);
}
