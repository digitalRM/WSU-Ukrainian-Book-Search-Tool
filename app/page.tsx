"use client";

import { useEffect, useState } from "react";
import { SearchBar } from "@/components/ui/SearchBar";
import { LibraryCard } from "@/components/ui/LibraryCard";
import { usePagination } from "@/hooks/use-pagination";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Library {
  institutionName: string;
  institutionIdentifier: string;
  n: string;
  City?: string;
  State?: string;
  Country?: string;
  libraryType: string;
  latitude?: string;
  longitude?: string;
}

const ITEMS_PER_PAGE = 48;

export default function Home() {
  const [libraries, setLibraries] = useState<Library[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        // Filter out any libraries with missing required fields
        const validLibraries = (data["Updated Data"] || []).filter(
          (lib: Partial<Library>) =>
            lib &&
            typeof lib.institutionName === "string" &&
            typeof lib.institutionIdentifier === "string" &&
            typeof lib.libraryType === "string"
        );
        setLibraries(validLibraries);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading library data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedType]);

  const filteredLibraries = libraries.filter((library) => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      (library.institutionName || "").toLowerCase().includes(searchTermLower) ||
      (library.City || "").toLowerCase().includes(searchTermLower) ||
      (library.State || "").toLowerCase().includes(searchTermLower) ||
      (library.Country || "").toLowerCase().includes(searchTermLower);

    const matchesType =
      selectedType === "all" || library.libraryType === selectedType;

    return matchesSearch && matchesType;
  });

  const totalPages = Math.ceil(filteredLibraries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedLibraries = filteredLibraries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const { pages, showLeftEllipsis, showRightEllipsis } = usePagination({
    currentPage,
    totalPages,
    paginationItemsToDisplay: 5,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-neutral-50 p-4 lg:p-8 lg:rounded-b-4xl border">
      <main className="max-w-7xl mx-auto">
        <div className="space-y-6">
          <div className="space-y-4 lg:mt-8">
            <div className="flex items-start justify-between sm:flex-row flex-col gap-4">
              <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight text-balance">
                Ukrainian Collection Search Tool
              </h1>
              <Link
                href="/leaderboards"
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                View Leaderboards →
              </Link>
            </div>
            <p className="text-sm text-neutral-600">
              This project, which was originally built as an internal tool for{" "}
              <a
                href="https://www.wsu.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Washington State University
              </a>{" "}
              research through the{" "}
              <a
                href="https://www.ukrainianbookproject.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Ukrainian Book Project
              </a>
              , is now available to anyone for research and educational
              purposes. This tool is based on information collected via OCLC, so
              holdings data may not be 100% accurate. This is especially
              important when looking at libraries outside the US, as OCLC
              tracking is not as reliable. We are not affiliated with OCLC in
              any way.
            </p>
            <p className="text-sm text-neutral-600">
              Search and explore libraries in the United States (with some
              libraries from other countries). Filter by type and location to
              find specific institutions.
            </p>
            <p className="text-sm text-neutral-600">
              Tool published March 28, 2025 - Data as of December 3, 2024.
            </p>
          </div>

          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedType={selectedType}
            onFilterChange={setSelectedType}
          />

          {loading ? (
            <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8">
              <div className="flex flex-col items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-3 border-neutral-200 border-t-blue-600"></div>
                <p className="mt-4 text-sm text-neutral-600">
                  Loading libraries...
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {paginatedLibraries.map((library) => (
                  <LibraryCard
                    key={library.institutionIdentifier}
                    library={library}
                  />
                ))}
              </div>

              {filteredLibraries.length > 0 ? (
                <div className="mt-8 flex flex-col items-center gap-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                          onClick={() => handlePageChange(currentPage - 1)}
                          aria-disabled={currentPage === 1}
                          role={currentPage === 1 ? "link" : undefined}
                        />
                      </PaginationItem>

                      {showLeftEllipsis && (
                        <PaginationItem className="hidden sm:block">
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      {pages.map((page) => (
                        <PaginationItem key={page} className="hidden sm:block">
                          <PaginationLink
                            onClick={() => handlePageChange(page)}
                            isActive={page === currentPage}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}

                      {showRightEllipsis && (
                        <PaginationItem className="hidden sm:block">
                          <PaginationEllipsis />
                        </PaginationItem>
                      )}

                      <PaginationItem>
                        <PaginationNext
                          className="aria-disabled:pointer-events-none aria-disabled:opacity-50"
                          onClick={() => handlePageChange(currentPage + 1)}
                          aria-disabled={currentPage === totalPages}
                          role={currentPage === totalPages ? "link" : undefined}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>

                  <p className="text-sm text-neutral-600">
                    Showing {startIndex + 1} to{" "}
                    {Math.min(
                      startIndex + ITEMS_PER_PAGE,
                      filteredLibraries.length
                    )}{" "}
                    of {filteredLibraries.length} libraries
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 text-center">
                  <p className="text-neutral-600">
                    No libraries found matching your search criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
}
