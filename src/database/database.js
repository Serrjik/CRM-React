import React, { useReducer } from 'react'
import orders from './orders.json'
import reducer from './reducer'
import { UPDATE_ORDER, CREATE_ORDER } from './Boilerplate'
import Context from './Context'

const withoutId = ({ id, ...data }) => data

export function DatabaseProvider(props) {
	const [state, dispatch] = useReducer(reducer, {
		lastReviewed: {
			maxLength: 4,
			orderIds: [1, 2, 3, 4],
		},
		maxOrders: 10,
		orders,
	})

	const getOrders = (offset = 0, limit = 10) =>
		state.orders.slice(offset, offset + limit)

	// Сколько всего заказов.
	const getOrdersAmount = () => state.orders.length

	const updateOrder = (id, data) =>
		dispatch({
			type: UPDATE_ORDER,
			payload: { id, data: withoutId(data) },
		})

	// Функция возвращает заказ по его id.
	const getOrderById = id => state.orders.find(order => order.id === id)

	const createOrder = order =>
		dispatch({ type: CREATE_ORDER, payload: order })

	const value = {
		state,
		dispatch,
		getOrders,
		getOrdersAmount,
		updateOrder,
		getOrderById,
		createOrder,
	}

	return <Context.Provider value={value}>{props.children}</Context.Provider>
}
