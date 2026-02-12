"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  X,
  Check,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCivicEducation } from "@/lib/civic-education/context";
import type { CivicEducationTopic } from "@/types";
import { formatDate } from "@/lib/utils";

export default function CivicEducationView() {
  const { topics, addTopic, updateTopic, removeTopic } = useCivicEducation();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Add form state
  const [newTitle, setNewTitle] = useState("");
  const [newSummary, setNewSummary] = useState("");
  const [newContent, setNewContent] = useState("");

  // Edit form state
  const [editTitle, setEditTitle] = useState("");
  const [editSummary, setEditSummary] = useState("");
  const [editContent, setEditContent] = useState("");

  function parseParagraphs(text: string): string[] {
    return text
      .split("\n")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);
  }

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim() || !newContent.trim()) return;
    addTopic(newTitle.trim(), newSummary.trim(), parseParagraphs(newContent));
    setNewTitle("");
    setNewSummary("");
    setNewContent("");
    setShowAddForm(false);
  }

  function startEdit(topic: CivicEducationTopic) {
    setEditingId(topic.id);
    setEditTitle(topic.title);
    setEditSummary(topic.summary);
    setEditContent(topic.content.join("\n\n"));
    setDeleteConfirmId(null);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editTitle.trim() || !editSummary.trim() || !editContent.trim()) return;
    updateTopic(editingId, editTitle.trim(), editSummary.trim(), parseParagraphs(editContent));
    setEditingId(null);
  }

  function handleDelete(id: string) {
    removeTopic(id);
    setDeleteConfirmId(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sl-gray-900">Civic Education</h1>
          <p className="text-sm text-sl-gray-500">
            Manage topics shown on the public civic education page
          </p>
        </div>
        <button
          onClick={() => {
            setShowAddForm(true);
            setEditingId(null);
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
        >
          <Plus className="h-4 w-4" />
          Add Topic
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mb-6 rounded-xl border border-sl-green-200 bg-sl-green-50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-sl-green-800">New Topic</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                Title *
              </label>
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                placeholder="e.g., Understanding Local Government"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                Summary *
              </label>
              <input
                type="text"
                value={newSummary}
                onChange={(e) => setNewSummary(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                placeholder="Brief one-line description shown before expanding"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                Content * <span className="font-normal text-sl-gray-400">(separate paragraphs with blank lines)</span>
              </label>
              <textarea
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                required
                rows={8}
                className="w-full rounded-lg border border-sl-gray-300 bg-white px-3 py-2 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                placeholder={"First paragraph of content...\n\nSecond paragraph of content...\n\nThird paragraph..."}
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-sl-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
              >
                <Check className="h-3.5 w-3.5" />
                Add Topic
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setNewTitle("");
                  setNewSummary("");
                  setNewContent("");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-sl-gray-200 bg-white px-4 py-2 text-sm font-medium text-sl-gray-600 hover:bg-sl-gray-50"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Topics list */}
      <div className="space-y-3">
        {topics.map((topic) => (
          <div
            key={topic.id}
            className="rounded-xl border border-sl-gray-200 bg-white shadow-sm"
          >
            {editingId === topic.id ? (
              /* Edit mode */
              <div className="p-5">
                <form onSubmit={handleUpdate} className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      required
                      className="h-10 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                      Summary *
                    </label>
                    <input
                      type="text"
                      value={editSummary}
                      onChange={(e) => setEditSummary(e.target.value)}
                      required
                      className="h-10 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                      Content * <span className="font-normal text-sl-gray-400">(separate paragraphs with blank lines)</span>
                    </label>
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      required
                      rows={8}
                      className="w-full rounded-lg border border-sl-gray-300 px-3 py-2 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-sl-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingId(null)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-sl-gray-200 px-4 py-2 text-sm font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                    >
                      <X className="h-3.5 w-3.5" />
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              /* View mode */
              <div>
                <div className="flex items-center justify-between p-4">
                  <button
                    onClick={() =>
                      setExpandedId((prev) => (prev === topic.id ? null : topic.id))
                    }
                    className="flex min-w-0 flex-1 items-center gap-3 text-left"
                  >
                    <div className="rounded-lg bg-sl-green-50 p-2.5">
                      <GraduationCap className="h-5 w-5 text-sl-green-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-sl-gray-900">
                        {topic.title}
                      </h3>
                      <p className="truncate text-xs text-sl-gray-500">
                        {topic.summary}
                      </p>
                      <p className="mt-0.5 text-[11px] text-sl-gray-400">
                        {topic.content.length} paragraph{topic.content.length !== 1 ? "s" : ""} &middot; Updated {formatDate(topic.updated_at)}
                      </p>
                    </div>
                    <div className="shrink-0 text-sl-gray-400">
                      {expandedId === topic.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </div>
                  </button>
                  <div className="ml-3 flex shrink-0 items-center gap-2">
                    {deleteConfirmId === topic.id ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-red-600">Delete?</span>
                        <button
                          onClick={() => handleDelete(topic.id)}
                          className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-600"
                        >
                          Yes
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-lg border border-sl-gray-200 px-3 py-1.5 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                        >
                          No
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          onClick={() => startEdit(topic)}
                          className="inline-flex items-center gap-1 rounded-lg border border-sl-gray-200 px-3 py-1.5 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                        >
                          <Pencil className="h-3 w-3" />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setDeleteConfirmId(topic.id);
                            setEditingId(null);
                          }}
                          className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="h-3 w-3" />
                          Remove
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Expanded content preview */}
                {expandedId === topic.id && (
                  <div className="border-t border-sl-gray-100 px-4 pb-4 pt-3 pl-16">
                    <div className="space-y-2">
                      {topic.content.map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-sm leading-relaxed text-sl-gray-600"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {topics.length === 0 && (
        <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
          <GraduationCap className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
          <p className="font-semibold text-sl-gray-700">No topics yet</p>
          <p className="text-sm text-sl-gray-500">
            Add your first civic education topic to get started.
          </p>
        </div>
      )}
    </div>
  );
}
