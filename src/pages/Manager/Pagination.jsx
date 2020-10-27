import React, { useState } from "react";

export default function Pagination({ onPagination, currentPage, commonPages }) {
  // Элемент пагинации с номером страницы.
  const PaginationItem = props => (
    <li 
      className={'page-item ' + (props.currentPage === props.pageNumber ? 'active' : '')}
      // onClick={() => currentPage = props.pageNumber}
      onClick={() => onPagination(props.pageNumber)}
    >
      <a className="page-link" href="/">
        {props.pageNumber}
      </a>
    </li>
  )
  
  // Кнопки пагинации.
  const paginationItems = []
  
  // Создаём кнопки пагинации.
  for (let i = 1; i <= commonPages; i++) {
    paginationItems.push(<PaginationItem key={i} pageNumber={i} currentPage={currentPage} />)
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">

        <li 
          className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}
          onClick={onPagination('prev')}
        >
          <a className="page-link" href="/" tabIndex="-1" aria-disabled="true">
            Назад
          </a>
        </li>

        {paginationItems.map(item => item)}

        {/* <li className="page-item active">
          <a className="page-link" href="/">
            1
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="/">
            2
          </a>
        </li>

        <li className="page-item">
          <a className="page-link" href="/">
            3
          </a>
        </li> */}

        <li 
          className={`page-item ${currentPage === commonPages ? 'disabled' : ''}`}
          onClick={onPagination('next')}
        >
          <a className="page-link" href="/">
            Вперед
          </a>
        </li>

      </ul>
    </nav>
  );
}
