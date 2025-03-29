import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (type: string) => void;
  selectedType: string;
}

const LIBRARY_TYPES = [
  { id: "all", label: "All Types" },
  { id: "Academic", label: "Academic" },
  { id: "Public & School (K-12)", label: "Public & School" },
  { id: "Government, State & National", label: "Government" },
  { id: "Vendor", label: "Vendor" },
  { id: "Museums & Archives", label: "Museums & Archives" },
  { id: "Special", label: "Special" },
  { id: "Other", label: "Other" },
] as const;

export function SearchBar({
  searchTerm,
  onSearchChange,
  onFilterChange,
  selectedType,
}: SearchBarProps) {
  return (
    <div className="w-full space-y-4">
      <div className="bg-white rounded-2xl shadow-xs border border-neutral-200">
        <div className="p-5 pb-6 rounded-t-2xl bg-neutral-50/50">
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search libraries by name, city, or country..."
              className="w-full px-4 py-3 rounded-lg text-xs sm:text-base bg-white/75 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white tracking-[-0.015em]"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-5 w-5 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="p-5 pt-4 border-t border-neutral-200">
          <p className="text-sm font-medium text-neutral-700 mb-3">
            Filter by type
          </p>
          <div className="flex flex-wrap gap-2">
            {LIBRARY_TYPES.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => onFilterChange(id)}
                className={`px-3 py-1 rounded-lg text-sm transition-colors tracking-tight font-medium ${
                  selectedType === id
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
          {selectedType !== "all" && (
            <div className="text-sm text-neutral-600 mt-4">
              Filtering by:{" "}
              {LIBRARY_TYPES.find((t) => t.id === selectedType)?.label}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
