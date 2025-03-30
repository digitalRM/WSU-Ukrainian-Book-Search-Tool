import React from "react";

interface Library {
  institutionName: string;
  institutionIdentifier: string;
  City?: string;
  State?: string;
  Country?: string;
  libraryType: string;
  latitude?: string;
  longitude?: string;
  n: string;
}

export function LibraryCard({ library }: { library: Library }) {
  const formatBookCount = (count: string): string => {
    const num = parseInt(count, 10);
    if (isNaN(num)) return count;

    if (num === 1) return "1 Ukrainian book";
    return `Ukrainian books: ${num.toLocaleString()}`;
  };

  const location = [library.City, library.Country].filter(Boolean).join(", ");

  return (
    <div className="bg-white rounded-xl border border-neutral-200 shadow-xs flex flex-col h-full">
      <div className="p-5 flex-grow flex flex-col">
        <div className="flex items-start justify-between gap-4 sm:flex-row flex-col">
          <h3 className="text-base font-semibold text-neutral-900 tracking-tight">
            {library.institutionName +
              " (" +
              library.institutionIdentifier +
              ")"}
          </h3>
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-neutral-100 text-neutral-600 whitespace-nowrap">
            {library.libraryType}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-neutral-600 flex-grow">
          {location && (
            <p className="flex items-center gap-2">
              <svg
                className="h-4 w-4 text-neutral-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {location}
            </p>
          )}
          <p className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {formatBookCount(library.n)}
          </p>
          <p className="flex items-center gap-2">
            <svg
              className="h-4 w-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
              />
            </svg>
            OCLC ID: {library.institutionIdentifier}
          </p>
        </div>

        {library.latitude && library.longitude && (
          <div className="mt-4 text-xs text-neutral-500 pt-2 border-t border-neutral-100">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${library.latitude},${library.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              View on Maps
              <svg
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
