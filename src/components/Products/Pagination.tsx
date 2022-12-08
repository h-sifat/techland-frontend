import { useState } from "react";

export interface Pagination_Argument {
  itemsCount: number;
  currentPage: number;
  itemsPerPage: number;
  maxPagesToShow?: number;
  onPageChange(arg: { pageNumber: number }): void;
}

const cursorPointerStyle = Object.freeze({ cursor: "pointer" });

export function Pagination(arg: Pagination_Argument) {
  const { itemsCount, itemsPerPage, onPageChange, maxPagesToShow = 5 } = arg;
  const pageCount = Math.ceil(itemsCount / itemsPerPage);

  const [currentPage, setCurrentPage] = useState(arg.currentPage);

  function goToNextPage() {
    if (currentPage >= pageCount) return;

    setCurrentPage(currentPage + 1);
    onPageChange({ pageNumber: currentPage });
  }
  function goToPreviousPage() {
    if (currentPage <= 1) return;

    setCurrentPage(currentPage - 1);
    onPageChange({ pageNumber: currentPage });
  }
  function makeNumberedPageClickHandler(pageNumber: number) {
    return () => {
      setCurrentPage(pageNumber);
      onPageChange({ pageNumber });
    };
  }

  return (
    <nav className="mt-5 mb-0">
      <ul className="pagination justify-content-center">
        <li
          className={currentPage === 1 ? "page-item disabled" : "page-item"}
          style={cursorPointerStyle}
          onClick={goToPreviousPage}
        >
          <a className="page-link">Previous</a>
        </li>

        {Array.from(
          { length: pageCount > maxPagesToShow ? maxPagesToShow : pageCount },
          (_, i) => {
            const pageNumber = i + 1;

            let pageItemClass = "page-item";
            if (pageNumber === currentPage) pageItemClass += " active";

            return (
              <li
                key={pageNumber}
                className={pageItemClass}
                style={cursorPointerStyle}
                onClick={makeNumberedPageClickHandler(pageNumber)}
              >
                <a className="page-link">{pageNumber}</a>
              </li>
            );
          }
        )}

        <li className="page-item disabled" style={cursorPointerStyle}>
          <a className="page-link">{currentPage}</a>
        </li>

        <li
          className={
            currentPage === pageCount ? "page-item disabled" : "page-item"
          }
          onClick={goToNextPage}
          style={cursorPointerStyle}
        >
          <a className="page-link">Next</a>
        </li>
      </ul>
    </nav>
  );
}
