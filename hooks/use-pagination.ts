interface UsePaginationProps {
  currentPage: number;
  totalPages: number;
  paginationItemsToDisplay?: number;
}

export function usePagination({
  currentPage,
  totalPages,
  paginationItemsToDisplay = 5,
}: UsePaginationProps) {
  // Calculate the range of pages to display
  const range = (start: number, end: number) =>
    Array.from({ length: end - start + 1 }, (_, i) => start + i);

  let pages: number[] = [];
  const halfDisplay = Math.floor(paginationItemsToDisplay / 2);

  // Calculate if we need to show ellipsis
  const showLeftEllipsis = currentPage > halfDisplay + 1;
  const showRightEllipsis = currentPage < totalPages - halfDisplay;

  if (totalPages <= paginationItemsToDisplay) {
    // If total pages is less than or equal to items to display, show all pages
    pages = range(1, totalPages);
  } else if (!showLeftEllipsis && showRightEllipsis) {
    // Show more pages at the start
    pages = range(1, paginationItemsToDisplay);
  } else if (showLeftEllipsis && !showRightEllipsis) {
    // Show more pages at the end
    pages = range(totalPages - paginationItemsToDisplay + 1, totalPages);
  } else {
    // Show pages around current page
    pages = range(currentPage - halfDisplay, currentPage + halfDisplay);
  }

  return {
    pages,
    showLeftEllipsis,
    showRightEllipsis,
  };
}
