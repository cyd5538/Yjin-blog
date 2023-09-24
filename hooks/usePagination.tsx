import { useState, useMemo, useEffect } from 'react';
import { compareDesc } from 'date-fns';
import { Post } from 'contentlayer/generated';

const ITEMS_PER_PAGE = 12;

const usePagination = (data: Post[], category: string) => {
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [category]);

  const sortedData = useMemo(
    () => data.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date))),
    [data]
  );

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = useMemo(() => sortedData.slice(startIndex, endIndex), [
    sortedData,
    startIndex,
    endIndex,
  ]);

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
