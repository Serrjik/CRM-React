import React from 'react'

export default function Pagination(props) {
	const { onPagination, currentPage, commonPages } = props

	if (commonPages <= 1) {
		return null
	}

	// Элемент пагинации с номером страницы.
	const PaginationItem = props => {
		const { pageNumber, currentPage } = props

		return (
			<li
				className={
					'page-item ' + (currentPage === pageNumber ? 'active' : '')
				}
			>
				<button
					onClick={() => {
						onPagination(pageNumber)
					}}
					className='page-link'
				>
					{pageNumber}
				</button>
			</li>
		)
	}

	// Кнопки пагинации.
	const paginationItems = []

	// Создаём кнопки пагинации.
	for (let i = 1; i <= commonPages; i++) {
		paginationItems.push(
			<PaginationItem key={i} pageNumber={i} currentPage={currentPage} />
		)
	}

	return (
		<nav aria-label='Page navigation example'>
			<ul className='pagination justify-content-center'>
				<li
					className={`page-item ${
						currentPage === 1 ? 'disabled' : ''
					}`}
				>
					<button
						className='page-link'
						onClick={() => onPagination('prev')}
						aria-disabled='true'
					>
						Назад
					</button>
				</li>

				{paginationItems.map(item => item)}

				<li
					className={`page-item ${
						currentPage === commonPages ? 'disabled' : ''
					}`}
				>
					<button
						className='page-link'
						onClick={() => onPagination('next')}
					>
						Вперед
					</button>
				</li>
			</ul>
		</nav>
	)
}
