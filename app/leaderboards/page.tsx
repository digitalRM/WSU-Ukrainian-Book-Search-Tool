"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Library {
  institutionName: string;
  institutionIdentifier: string;
  n: string;
  City?: string;
  State?: string;
  Country?: string;
  libraryType: string;
}

type Category = "all" | "academic" | "public" | "government" | "us";

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All Libraries" },
  { id: "us", label: "US Libraries" },
  { id: "academic", label: "Academic Libraries" },
  { id: "public", label: "Public Libraries" },
  { id: "government", label: "Government Libraries" },
];

export default function Leaderboards() {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category>("all");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        const validLibraries = (data["Updated Data"] || [])
          .filter(
            (lib: any) =>
              lib &&
              typeof lib.institutionName === "string" &&
              typeof lib.institutionIdentifier === "string" &&
              typeof lib.libraryType === "string" &&
              typeof lib.n === "string"
          )
          .map((lib: Library) => ({
            ...lib,
            n: lib.n || "0",
          }));
        setLibraries(validLibraries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading library data:", error);
        setLoading(false);
      });
  }, []);

  const getFilteredAndSortedLibraries = () => {
    let filtered = [...libraries];

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((lib) => {
        switch (selectedCategory) {
          case "us":
            return lib.Country === "US";
          case "academic":
            return lib.libraryType === "Academic";
          case "public":
            return lib.libraryType === "Public & School (K-12)";
          case "government":
            return lib.libraryType === "Government, State & National";
          default:
            return true;
        }
      });
    }

    // Sort by number of books
    return filtered.sort((a, b) => parseInt(b.n) - parseInt(a.n)).slice(0, 100);
  };

  const formatNumber = (num: string) => {
    return parseInt(num).toLocaleString();
  };

  const filteredLibraries = getFilteredAndSortedLibraries();

  return (
    <div className="min-h-screen bg-neutral-50 p-4 lg:p-8">
      <main className="max-w-7xl mx-auto">
        <div className="space-y-6 lg:mt-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                Library Collection Leaderboards
              </h1>
              <p className="text-sm text-neutral-600 mt-1">
                Top 100 libraries by number of Ukrainian books in the collection
              </p>
            </div>
            <Link
              href="/"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
            >
              ← Back to Search
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-neutral-200 shadow-xs overflow-hidden">
            <div className="p-4 border-b border-neutral-200">
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`px-3 py-1.5 rounded-md text-sm transition-colors tracking-tight font-medium ${
                      selectedCategory === id
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="p-8 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-3 border-neutral-200 border-t-blue-600"></div>
                <p className="mt-4 text-sm text-neutral-600">Loading data...</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-neutral-200 bg-neutral-50">
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider w-12">
                        Rank
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Institution
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider min-w-[220px]">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider min-w-[150px]">
                        Location
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        Books
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200">
                    {filteredLibraries.map((library, index) => {
                      const location = [
                        library.City,
                        library.State,
                        library.Country,
                      ]
                        .filter(Boolean)
                        .join(", ");

                      return (
                        <tr
                          key={library.institutionIdentifier}
                          className="hover:bg-neutral-50"
                        >
                          <td className="px-4 py-3 text-sm text-neutral-500 font-medium">
                            #{index + 1}
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-900">
                            {library.institutionName}
                          </td>
                          <td className="px-4 py-3">
                            <span className="px-2 py-1 text-xs font-medium rounded-md bg-neutral-100 text-neutral-600">
                              {library.libraryType}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-600">
                            {location}
                          </td>
                          <td className="px-4 py-3 text-sm text-neutral-900 tabular-nums text-right">
                            {formatNumber(library.n)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
