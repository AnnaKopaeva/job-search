interface PaginationProps {
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, hasNextPage, onPageChange }: PaginationProps) {
  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-md ${
          currentPage === 1 ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Previous
      </button>
      <span className="text-gray-700">
        Page {currentPage}
      </span>
      <button
        onClick={handleNext}
        disabled={!hasNextPage}
        className={`px-4 py-2 rounded-md ${
          !hasNextPage ? "bg-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
      >
        Next
      </button>
    </div>
  );
}
