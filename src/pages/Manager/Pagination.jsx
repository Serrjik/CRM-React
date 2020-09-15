import React from "react";

export default function Pagination({ commonPages }) {
  let currentPage = 1

  const getPrevPage = () => {
    if (currentPage !== 1) {
      currentPage--
      return currentPage
    }
  }

  const getNextPage = () => {
    if (currentPage !== commonPages) {
      currentPage++
      return currentPage
    }
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {/* for (let i = 0; i < state.commonPages; i++) {

        } */}

        <li 
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={getPrevPage}
        >
          <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">
            Назад
          </a>
        </li>

        <li className="page-item active">
          <a className="page-link" href="#">
            1
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            2
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="#">
            3
          </a>
        </li>

        <li 
          className={`page-item ${currentPage === commonPages ? 'disabled' : ''}`}
          onClick={getNextPage}
        >
          <a className="page-link" href="#">
            Вперед
          </a>
        </li>

      </ul>
    </nav>
  );
}
