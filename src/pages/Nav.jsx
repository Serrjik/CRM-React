import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import Context from '../database/Context'

const sitePath = window.location.protocol + '//' + window.location.host

export default function Nav() {
	const value = useContext(Context)
	const lastReviewedOrdersIDs = value.state.lastReviewed.orderIds
	const getOrderById = value.getOrderById

	// const history = useHistory()

	// const handlerEdit = orderId => {
	// 	console.log('edit')
	// 	history.push(`/editor/${orderId}`)
	// }

	return (
		<nav
			className='col-md-2 d-none d-md-block bg-light sidebar'
			style={{ height: '100vh' }}
		>
			<div className='sidebar-sticky'>
				<Link
					to={'/order/'}
					className='sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-decoration-none'
				>
					<button type='button' className='btn btn-primary'>
						Новый заказ
					</button>
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
					<li className='nav-item'>
						<a className='nav-link' href='/'>
							<img
								src={sitePath + '/assets/new.png'}
								alt=''
								style={{ width: '30px' }}
								className='mr-2'
							/>
							Новые
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/'>
							<img
								src={sitePath + '/assets/innovation.png'}
								alt=''
								style={{ width: '30px' }}
								className='mr-2'
							/>
							На исполнение
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/'>
							<img
								src={sitePath + '/assets/back.png'}
								alt=''
								style={{ width: '30px' }}
								className='mr-2'
							/>
							Возврат
						</a>
					</li>
					<li className='nav-item'>
						<a className='nav-link' href='/'>
							<img
								src={sitePath + '/assets/compressed.png'}
								alt=''
								style={{ width: '30px' }}
								className='mr-2'
							/>
							Заархивированные
						</a>
					</li>
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
							// onEdit={handlerEdit}
						/>
					))}
				</ul>
			</div>
		</nav>
	)
}

const Li = props => {
	const { id, fullname } = props

	return (
		// <li className='nav-item' onClick={() => onEdit(id)}>
		<li className='nav-item'>
			{/* <button className='nav-link'> */}
			<Link className='nav-link' to={`/editor/${id}`}>
				<img
					src={sitePath + '/assets/arrow.png'}
					alt=''
					style={{ width: '30px' }}
					className='mr-2'
				/>
				{fullname}
				{/* </button> */}
			</Link>
		</li>
	)
}
