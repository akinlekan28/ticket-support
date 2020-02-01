import React from "react";

const Pagination = ({ recordPerPage, totalRecords, paginate, currentPage, currentLevel }) => {
  const pageNumbers = [];
  recordPerPage = parseInt(recordPerPage);

  for (let i = 1; i <= Math.ceil(totalRecords.length / recordPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <div>
      <nav>
        <div className="row mt-5">
          <div className="col-md-6">
            <p className="text-left">
              Showing{" "}
              {recordPerPage === currentLevel.length
                ? recordPerPage
                : currentLevel.length}{" "}
              of {totalRecords.length} records
            </p>
          </div>
          <div className="col-md-6">
            <ul className="pagination float-right">
              {pageNumbers.map(number => (
                <li key={number} className="page-item">
                  <span
                    onClick={() => paginate(number)}
                    className={
                      (currentPage === number ? "pagination-active " : "") +
                      "page-link"
                    }
                  >
                    {number}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Pagination;
