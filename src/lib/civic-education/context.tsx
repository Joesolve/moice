"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { CivicEducationTopic } from "@/types";
import { CIVIC_EDUCATION_TOPICS as INITIAL_TOPICS } from "@/lib/mock-data";

interface CivicEducationContextType {
  topics: CivicEducationTopic[];
  addTopic: (title: string, summary: string, content: string[]) => void;
  updateTopic: (id: string, title: string, summary: string, content: string[]) => void;
  removeTopic: (id: string) => void;
}

const CivicEducationContext = createContext<CivicEducationContextType>({
  topics: INITIAL_TOPICS,
  addTopic: () => {},
  updateTopic: () => {},
  removeTopic: () => {},
});

export function CivicEducationProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<CivicEducationTopic[]>(INITIAL_TOPICS);

  function addTopic(title: string, summary: string, content: string[]) {
    const now = new Date().toISOString();
    const newTopic: CivicEducationTopic = {
      id: `ce_${Date.now()}`,
      title,
      summary,
      content,
      created_at: now,
      updated_at: now,
    };
    setTopics((prev) => [...prev, newTopic]);
  }

  function updateTopic(id: string, title: string, summary: string, content: string[]) {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, title, summary, content, updated_at: new Date().toISOString() }
          : t
      )
    );
  }

  function removeTopic(id: string) {
    setTopics((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <CivicEducationContext.Provider value={{ topics, addTopic, updateTopic, removeTopic }}>
      {children}
    </CivicEducationContext.Provider>
  );
}

export function useCivicEducation() {
  return useContext(CivicEducationContext);
}
