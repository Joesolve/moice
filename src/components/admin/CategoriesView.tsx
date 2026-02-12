"use client";

import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Tag,
  X,
  Check,
} from "lucide-react";
import { useCategories } from "@/lib/categories/context";
import type { Category } from "@/types";

export default function CategoriesView() {
  const { categories, addCategory, updateCategory, removeCategory } = useCategories();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Add form state
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  // Edit form state
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");

  function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    addCategory(newName.trim(), newDescription.trim());
    setNewName("");
    setNewDescription("");
    setShowAddForm(false);
  }

  function startEdit(cat: Category) {
    setEditingId(cat.id);
    setEditName(cat.name);
    setEditDescription(cat.description ?? "");
    setDeleteConfirmId(null);
  }

  function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editingId || !editName.trim()) return;
    updateCategory(editingId, editName.trim(), editDescription.trim());
    setEditingId(null);
  }

  function handleDelete(id: string) {
    removeCategory(id);
    setDeleteConfirmId(null);
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sl-gray-900">Categories</h1>
          <p className="text-sm text-sl-gray-500">
            Manage data categories available to contributing ministries
          </p>
        </div>
        <button
          onClick={() => { setShowAddForm(true); setEditingId(null); }}
          className="inline-flex items-center gap-2 rounded-lg bg-sl-green-500 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sl-green-600"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="mb-6 rounded-xl border border-sl-green-200 bg-sl-green-50 p-5">
          <h3 className="mb-3 text-sm font-semibold text-sl-green-800">New Category</h3>
          <form onSubmit={handleAdd} className="space-y-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                Name *
              </label>
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                placeholder="e.g., Water & Sanitation"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                Description
              </label>
              <input
                type="text"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="h-10 w-full rounded-lg border border-sl-gray-300 bg-white px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                placeholder="Brief description of this category"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 rounded-lg bg-sl-green-500 px-4 py-2 text-sm font-semibold text-white hover:bg-sl-green-600"
              >
                <Check className="h-3.5 w-3.5" />
                Add
              </button>
              <button
                type="button"
                onClick={() => { setShowAddForm(false); setNewName(""); setNewDescription(""); }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-sl-gray-200 bg-white px-4 py-2 text-sm font-medium text-sl-gray-600 hover:bg-sl-gray-50"
              >
                <X className="h-3.5 w-3.5" />
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories list */}
      <div className="space-y-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-xl border border-sl-gray-200 bg-white p-4 shadow-sm"
          >
            {editingId === cat.id ? (
              /* Edit mode */
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-sl-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="h-10 w-full rounded-lg border border-sl-gray-300 px-3 text-sm focus:border-sl-green-500 focus:outline-none focus:ring-2 focus:ring-sl-green-500/20"
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
            ) : (
              /* View mode */
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-sl-blue-50 p-2.5">
                    <Tag className="h-5 w-5 text-sl-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-sl-gray-900">
                      {cat.name}
                    </h3>
                    {cat.description && (
                      <p className="text-xs text-sl-gray-500">{cat.description}</p>
                    )}
                    <p className="mt-0.5 text-[11px] text-sl-gray-400">
                      slug: {cat.slug}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {deleteConfirmId === cat.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-red-600">Delete?</span>
                      <button
                        onClick={() => handleDelete(cat.id)}
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
                        onClick={() => startEdit(cat)}
                        className="inline-flex items-center gap-1 rounded-lg border border-sl-gray-200 px-3 py-1.5 text-xs font-medium text-sl-gray-600 hover:bg-sl-gray-50"
                      >
                        <Pencil className="h-3 w-3" />
                        Edit
                      </button>
                      <button
                        onClick={() => { setDeleteConfirmId(cat.id); setEditingId(null); }}
                        className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="rounded-xl border border-sl-gray-200 bg-white p-10 text-center">
          <Tag className="mx-auto mb-3 h-12 w-12 text-sl-gray-300" />
          <p className="font-semibold text-sl-gray-700">No categories</p>
          <p className="text-sm text-sl-gray-500">
            Add your first category to get started.
          </p>
        </div>
      )}
    </div>
  );
}
