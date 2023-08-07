import { useState, useMemo } from 'react';
import { compareDesc } from 'date-fns';
import { Post } from 'contentlayer/generated';

const ITEMS_PER_PAGE = 4;

const usePagination = (data: Post[]) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sortedData = useMemo(() => data.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))), [data]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = useMemo(() => sortedData.slice(startIndex, endIndex), [sortedData, startIndex, endIndex]);

  const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return {
    currentPage,
    currentData,
    totalPages,
    handlePageChange,
  };
};

export default usePagination;
