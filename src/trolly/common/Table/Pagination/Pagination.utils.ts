import { ArrowDirectionType } from "./Direction";
export const getPagesNumbers = (
  current: number,
  total: number,
  isMobile: boolean,
  { min = 2 } = {}
) => {
  if (total > 1) {
    let length;
    if (!isMobile) {
      length = 3;
    } else {
      length = 1;
    }
    const totalPages = total - 2;
    if (length > totalPages) {
      length = totalPages;
    }
    let start = current - Math.floor((length - 1) / 2);
    start = Math.max(start, min);
    start = Math.min(start, min + totalPages - length);
    const arr = new Array(length);
    for (let i = 0; i < length; i++) {
      arr.push(i + start);
    }
    return arr;
  }
};

export const shouldShowCollapse = (
  direction: ArrowDirectionType,
  totalPages: number,
  currentPage: number,
  isMobile: boolean
) => {
  let numberOfBlocks;
  if (!isMobile) {
    numberOfBlocks = 3;
  } else {
    numberOfBlocks = 1;
  }
  if (totalPages > 5) {
    if (direction === "left") {
      return (
        (currentPage > 3 && numberOfBlocks > 2) ||
        (currentPage >= 3 && numberOfBlocks <= 2)
      );
    } else {
      return (
        (currentPage < totalPages - 2 && numberOfBlocks > 2) ||
        (currentPage < totalPages - 1 && numberOfBlocks <= 2)
      );
    }
  } else if (totalPages > 3) {
    if (isMobile) {
      return (
        (currentPage > 2 && direction === "left") ||
        (currentPage < totalPages - 1 && direction === "right")
      );
    }
  }
};
