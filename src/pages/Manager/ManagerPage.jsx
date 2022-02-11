// Страница "Заказы" (стартовая).
import React, { useState, useContext, useEffect } from 'react'

import MainWrapper from '../MainWrapper'
import Filters from './Filters'
import OrderTable from './OrderTable'
import Pagination from './Pagination'
import useDatabase from '../../database/useDatabase'

import { useHistory } from 'react-router-dom'

import Context from '../../database/Context'

export default function ManagerPage({ page }) {
	const [status, setStatus] = useState('')

	// Пагинация.
	const [currentPage, setCurrentPage] = useState(1)

	const value = useContext(Context)

	// Максимальное количество заказов на странице.
	const limit = value.state.maxOrders

	const history = useHistory()
	const { getOrders, getOrdersAmount } = useDatabase()

	// Всего заказов.
	const ordersAmount = getOrdersAmount()
	// С какого заказа отображать заказы на выбранной странице.
	const offset = (currentPage - 1) * limit

	const orders = getOrders(offset, ordersAmount)

	// Заказы после фильтра.
	const [displayedOrders, setDisplayedOrders] = useState([...orders])
	// Заказы, которые должны отрисоваться на странице при пагинации.
	const [paginatedOrders, setPaginatedOrders] = useState([...displayedOrders])

	const handlerFilter = filters => {
		let filteredOrders = [...orders]

		// 0: {type: "name", content: "Тимофей "}
		// 1: {type: "order", content: "Принтер"}
		// 2: {type: "status", content: "Новые"}
		// 3: {type: "minPrice", content: "1"}
		// 4: {type: "maxPrice", content: "5"}
		// 5: {type: "startDate", content: "2020-09-06"}
		// 6: {type: "finalDate", content: "2020-10-01"}

		// date: 1582739937251
		// fullname: "Тимофей Черешников 1"
		// good: "Бумага для принтера"
		// id: 1
		// price: 500
		// status: "process"

		for (const filter of filters) {
			if (filter.type === 'name') {
				filteredOrders = filteredOrders.filter(order =>
					order.fullname
						.toLowerCase()
						.startsWith(filter.content.toLowerCase())
				)
			}

			if (filter.type === 'order') {
				filteredOrders = filteredOrders.filter(
					order =>
						order.good.toLowerCase() ===
						filter.content.toLowerCase()
				)
			}

			if (filter.type === 'status') {
				filteredOrders = filteredOrders.filter(
					order =>
						order.status.toLowerCase() ===
						filter.content.toLowerCase()
				)
			}

			if (filter.type === 'minPrice') {
				filteredOrders = filteredOrders.filter(
					order => order.price >= filter.content
				)
			}

			if (filter.type === 'maxPrice') {
				filteredOrders = filteredOrders.filter(
					order => order.price <= filter.content
				)
			}

			if (filter.type === 'startDate') {
				filteredOrders = filteredOrders.filter(
					order => order.date >= Date.parse(filter.content)
				)
			}

			if (filter.type === 'finalDate') {
				filteredOrders = filteredOrders.filter(
					order => order.date <= Date.parse(filter.content)
				)
			}
		}

		setDisplayedOrders([...filteredOrders])
	}

	const handlerEdit = orderId => {
		history.push(`/editor/${orderId}`)
	}

	const handlerPagination = nextPage => {
		if (nextPage === 'prev') {
			setCurrentPage(currentPage => currentPage - 1)
		} else if (nextPage === 'next') {
			setCurrentPage(currentPage => currentPage + 1)
		} else if (typeof nextPage === 'number') {
			setCurrentPage(nextPage)
		}
	}

	// Количество страниц.
	const commonPages = Math.ceil(displayedOrders.length / limit)

	useEffect(
		() =>
			setPaginatedOrders(
				displayedOrders.slice(
					(currentPage - 1) * limit,
					currentPage * limit
				)
			),
		[displayedOrders, currentPage, limit]
	)

	return (
		<MainWrapper setStatus={setStatus}>
			<main
				role='main'
				className='col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column'
			>
				<div className='d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom'>
					<h1 className='h2'>Заказы</h1>
				</div>

				<Filters
					onFilter={handlerFilter}
					status={status}
					setStatus={setStatus}
				/>
				<OrderTable onEdit={handlerEdit} orders={paginatedOrders} />
				<Pagination
					onPagination={handlerPagination}
					currentPage={currentPage}
					commonPages={commonPages}
				/>
			</main>
		</MainWrapper>
	)
}
