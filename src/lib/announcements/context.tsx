"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Announcement, AnnouncementStatus } from "@/types";
import { MOCK_ANNOUNCEMENTS as INITIAL_ANNOUNCEMENTS, MINISTRIES } from "@/lib/mock-data";

interface AnnouncementsContextType {
  announcements: Announcement[];
  addAnnouncement: (
    title: string,
    summary: string,
    body: string,
    ministryId: string,
    submittedBy: string,
  ) => void;
  updateAnnouncementStatus: (id: string, status: AnnouncementStatus) => void;
}

const AnnouncementsContext = createContext<AnnouncementsContextType>({
  announcements: INITIAL_ANNOUNCEMENTS,
  addAnnouncement: () => {},
  updateAnnouncementStatus: () => {},
});

export function AnnouncementsProvider({ children }: { children: ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>(INITIAL_ANNOUNCEMENTS);

  function addAnnouncement(
    title: string,
    summary: string,
    body: string,
    ministryId: string,
    submittedBy: string,
  ) {
    const now = new Date().toISOString();
    const ministry = MINISTRIES.find((m) => m.id === ministryId);
    const newAnnouncement: Announcement = {
      id: `ann_${Date.now()}`,
      title,
      summary,
      body,
      ministry_id: ministryId,
      ministry,
      submitted_by: submittedBy,
      status: "submitted",
      created_at: now,
      updated_at: now,
      published_at: null,
    };
    setAnnouncements((prev) => [newAnnouncement, ...prev]);
  }

  function updateAnnouncementStatus(id: string, status: AnnouncementStatus) {
    setAnnouncements((prev) =>
      prev.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              updated_at: new Date().toISOString(),
              published_at: status === "published" ? new Date().toISOString() : a.published_at,
            }
          : a
      )
    );
  }

  return (
    <AnnouncementsContext.Provider value={{ announcements, addAnnouncement, updateAnnouncementStatus }}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export function useAnnouncements() {
  return useContext(AnnouncementsContext);
}
