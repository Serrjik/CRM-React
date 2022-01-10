import React from 'react'

export default function Pagination({ onPagination, currentPage, commonPages }) {
	// Элемент пагинации с номером страницы.
	const PaginationItem = props => (
		<li
			className={
				'page-item ' +
				(props.currentPage === props.pageNumber ? 'active' : '')
			}
			onClick={() => onPagination(props.pageNumber)}
		>
			<button className="page-link" href="/">
				{props.pageNumber}
			</button>
		</li>
	)

	// Кнопки пагинации.
	const paginationItems = []

	// Создаём кнопки пагинации.
	for (let i = 1; i <= commonPages; i++) {
		paginationItems.push(
			<PaginationItem key={i} pageNumber={i} currentPage={currentPage} />
		)
	}

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination justify-content-center">
				<li
					className={`page-item ${
						currentPage === 1 ? 'disabled' : ''
					}`}
					onClick={onPagination('prev')}
				>
					<button
						className="page-link"
						href="/"
						tabIndex="-1"
						aria-disabled="true"
					>
						Назад
					</button>
				</li>

				{paginationItems.map(item => item)}

				<li
					className={`page-item ${
						currentPage === commonPages ? 'disabled' : ''
					}`}
					onClick={onPagination('next')}
				>
					<button className="page-link" href="/">
						Вперед
					</button>
				</li>
			</ul>
		</nav>
	)
}
