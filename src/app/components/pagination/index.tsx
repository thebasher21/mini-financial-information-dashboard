import { ChangeEvent, Dispatch, SetStateAction } from "react";
import styles from "./pagination.module.css";

export type PaginationDetails = {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
};

type PaginationProps = {
  pagination: PaginationDetails;
  setPagination: Dispatch<SetStateAction<PaginationDetails>>;
};

export default function Pagination(props: PaginationProps) {
  function handlePaginationChange(e: ChangeEvent<HTMLInputElement>) {
    // e.preventDefault();
    let newPage: number = parseInt(e.currentTarget.value);
    if (newPage !== props.pagination.currentPage) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: newPage,
        };
      });
    }
  }
  function handleGotoFirstPage() {
    if (props.pagination.currentPage !== 1) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: 1,
        };
      });
    }
  }
  function handleGotoLastPage() {
    if (props.pagination.currentPage !== props.pagination.totalPages) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.totalPages,
        };
      });
    }
  }
  function handleNextPage() {
    if (props.pagination.currentPage !== props.pagination.totalPages) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage + 1,
        };
      });
    }
  }
  function handlePreviousPage() {
    if (props.pagination.currentPage !== 1) {
      props.setPagination((prev) => {
        return {
          ...prev,
          currentPage: prev.currentPage - 1,
        };
      });
    }
  }
  function handlePageSizeChange(e: ChangeEvent<HTMLSelectElement>) {
    props.setPagination((prev) => {
      return {
        ...prev,
        itemsPerPage: parseInt(e.target.value),
      };
    });
  }
  return (
    <div className={styles.paginationContainer}>
      <nav aria-label="Page navigation">
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link text-bg-dark"
              onClick={handleGotoFirstPage}
              aria-label="First"
              type="button"
            >
              <span aria-hidden="true">&lt;&lt;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link text-bg-dark"
              type="button"
              aria-label="Previous"
              onClick={handlePreviousPage}
            >
              <span aria-hidden="true">&lt;</span>
            </button>
          </li>
          <li className="page-item">
            <div className={styles.pageNumberContainer}>
              <input
                aria-label="Current Page Number"
                type="text"
                value={props.pagination.currentPage}
                className={`page-link text-bg-info`}
                onChange={(e) => handlePaginationChange(e)}
              ></input>
            </div>
          </li>
          <li className="page-item disabled">
            <div className={styles.pageNumberContainer}>
              <input
                aria-label="Divider"
                className="page-link disabled text-bg-dark"
                defaultValue={"/"}
              ></input>
            </div>
          </li>
          <li className="page-item disabled">
            <div className={styles.pageNumberContainer}>
              <input
                aria-label="Total Pages"
                type="text"
                value={props.pagination.totalPages}
                className={`page-link disabled text-bg-dark`}
                readOnly
              ></input>
            </div>
          </li>
          <li className="page-item">
            <button
              className="page-link text-bg-dark"
              onClick={handleNextPage}
              aria-label="Next"
              type="button"
            >
              <span aria-hidden="true">&gt;</span>
            </button>
          </li>
          <li className="page-item">
            <button
              className="page-link text-bg-dark"
              onClick={handleGotoLastPage}
              aria-label="Last"
              type="button"
            >
              <span aria-hidden="true">&gt;&gt;</span>
            </button>
          </li>
        </ul>
      </nav>
      <div className={styles.setPageItems}>
        <label htmlFor="items-per-page" className="form-label text-light">
          Items Per Page
        </label>
        <select
          id="items-per-page"
          className="form-select text-bg-dark"
          aria-label="Items per page"
          value={props.pagination.itemsPerPage}
          onChange={(e) => handlePageSizeChange(e)}
        >
          <option value={10}>10</option>
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={50}>50</option>
        </select>
      </div>
    </div>
  );
}
