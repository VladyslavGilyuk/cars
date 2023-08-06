import { useMemo } from "react";
// Special symbol to represent an ellipsis in the pagination range
export const DOTS = '...';

export const usePagination = ({
  // The usePagination hook generates a pagination range based on the current page, total number of items, and page size.
  // It returns an array of page numbers, including ellipsis(многоточие) when needed for better navigation.
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage
}) => {
 // The useMemo hook is used to memoize the pagination range calculation, ensuring that it is only recalculated when its dependencies change.
  // It takes a function as its first argument, which computes the pagination range based on the provided dependencies.
  // The dependencies are specified in the second argument as an array.

  // Function to generate the pagination range
  const paginationRange = useMemo(() => {
    // Calculate the total number of pages based on the total item count and page size
    const totalPageCount = Math.ceil(totalCount / pageSize);
    // Helper function to create a range of numbers from start to end (inclusive)
    const range = (start, end) => {
      let length = end - start + 1;
      return Array.from({ length }, (_, idx) => idx + start);
    };
    // If there are no items, or the total page count is less than 1, return an empty array
    if (totalPageCount < 1) {
      return [];
    }
    // If the total page count is less than or equal to siblingCount + 5, display the full range of pages
    if (totalPageCount <= siblingCount + 5) {
      return range(1, totalPageCount);
    }
    // Calculate the indices of the left and right siblings based on the current page and sibling count
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );
    // Determine whether to display ellipsis on the left and/or right sides
    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
    // Define the first and last page indices
    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;
    // Generate the pagination range with ellipsis when appropriate
    if (!shouldShowLeftDots && shouldShowRightDots) {
      // If ellipsis is needed on the right side but not on the left, show a partial range on the left side
      // Calculate the number of items to be displayed on the left side (leftItemCount)
      let leftItemCount = 3 + 2 * siblingCount;
      // Generate a range of page numbers from 1 to leftItemCount (inclusive) for the left side
      let leftRange = range(1, leftItemCount);
      // Append the ellipsis symbol (DOTS) and the last page number (totalPageCount) to the left range
      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      // If ellipsis is needed on the left side but not on the right, show a partial range on the right side
      // Calculate the number of items to be displayed on the right side (rightItemCount)
      let rightItemCount = 3 + 2 * siblingCount;
      // Generate a range of page numbers from (totalPageCount - rightItemCount + 1) to totalPageCount (inclusive) for the right side
      let rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      // Prepend the first page number (firstPageIndex) and the ellipsis symbol (DOTS) to the right range
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      // If ellipsis is needed on both the left and right sides, show a range around the current page (middle range)
      // Generate a range of page numbers from leftSiblingIndex to rightSiblingIndex (inclusive) for the middle range
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      // Prepend the first page number (firstPageIndex) and the ellipsis symbol (DOTS) to the middle range
      // Append the ellipsis symbol (DOTS) and the last page number (lastPageIndex) to the middle range
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    // Return the calculated pagination range
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);
  // Return the computed pagination range
  return paginationRange;
};
