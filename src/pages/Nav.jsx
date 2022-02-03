import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../database/Context'
import { useRouteMatch } from 'react-router-dom'

const sitePath = window.location.protocol + '//' + window.location.host

export default function Nav(props) {
	const value = useContext(Context)
	const lastReviewedOrdersIDs = value.state.lastReviewed.orderIds
	const getOrderById = value.getOrderById

	const match = useRouteMatch({ path: '/', strict: true })

	const { setStatus } = props

	/* Данные кнопок режимов отображения заказов. */
	const modeButtons = [
		{ status: 'new', caption: 'Новые', image: 'new' },
		{ status: 'process', caption: 'На исполнение', image: 'innovation' },
		{ status: 'back', caption: 'Возврат', image: 'back' },
		{
			status: 'archived',
			caption: 'Заархивированные',
			image: 'compressed',
		},
	]

	return (
		<nav
			className='col-md-2 d-none d-md-block bg-light sidebar'
			style={{ height: '100vh' }}
		>
			<div className='sidebar-sticky'>
				<Link
					to={'/order/'}
					className='px-3 mt-4 mb-1 text-decoration-none btn btn-primary'
				>
					Новый заказ
				</Link>

				<h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1'>
					Режимы
				</h6>

				<ul className='nav flex-column'>
					<li className='nav-item'>
						<a className='nav-link active' href='/'>
							<img
								src={sitePath + '/assets/data-collection.png'}
								alt=''
								style={{ width: '30px' }}
								className='mr-2'
							/>
							Все заказы
						</a>
					</li>

					{modeButtons.map(({ status, image, caption }) => (
						<LiModeButtons
							key={status}
							status={status}
							setStatus={setStatus}
							img={image}
							caption={caption}
							match={match}
						/>
					))}
				</ul>

				<h6 className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted'>
					Последние просматриваемые
				</h6>
				<ul className='nav flex-column mb-2'>
					{lastReviewedOrdersIDs.map(id => (
						<Li
							id={id}
							key={id}
							fullname={getOrderById(id).fullname}
						/>
					))}
				</ul>
			</div>
		</nav>
	)
}

const LiModeButtons = props => {
	const { status, img, setStatus, caption, match } = props

	return (
		<li className='nav-item'>
			<button
				className='nav-link text-left'
				onClick={() => {
					// Если открыта страница с заказами:
					if (match.isExact === true) {
						setStatus(status)
					}
				}}
				style={{
					width: '100%',
					border: 'none',
					backgroundColor: 'transparent',
				}}
			>
				<img
					src={sitePath + `/assets/${img}.png`}
					alt=''
					style={{ width: '30px' }}
					className='mr-2'
				/>
				{caption}
			</button>
		</li>
	)
}

const Li = props => {
	const { id, fullname } = props

	return (
		<li className='nav-item'>
			<Link className='nav-link' to={`/editor/${id}`}>
				<img
					src={sitePath + '/assets/arrow.png'}
					alt=''
					style={{ width: '30px' }}
					className='mr-2'
				/>
				{fullname}
			</Link>
		</li>
	)
}
