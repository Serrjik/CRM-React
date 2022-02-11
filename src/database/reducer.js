import { UPDATE_ORDER, CREATE_ORDER } from './Boilerplate'

export default function reducer(state, action) {
	if (action.type === UPDATE_ORDER) {
		const currentOrderIds = state.lastReviewed.orderIds.slice()
		if (currentOrderIds.includes(action.payload.id)) {
			currentOrderIds.unshift(
				...currentOrderIds.splice(
					currentOrderIds.indexOf(action.payload.id),
					1
				)
			)
		} else {
			currentOrderIds.pop()
			currentOrderIds.unshift(action.payload.id)
		}

		localStorage.setItem(
			'CRM_REACT_ORDERS',
			JSON.stringify({
				...state,
				orders: state.orders.map(order => {
					if (order.id !== action.payload.id) {
						return order
					}

					return Object.assign({}, order, action.payload.data)
				}),
				lastReviewed: {
					...state.lastReviewed,
					orderIds: currentOrderIds,
				},
			})
		)

		return {
			...state,
			orders: state.orders.map(order => {
				if (order.id !== action.id) {
					return order
				}

				return Object.assign({}, order, action.data)
			}),
			lastReviewed: {
				...state.lastReviewed,
				orderIds: currentOrderIds,
			},
		}
	}

	if (action.type === CREATE_ORDER) {
		const id = 1 + Math.max(0, ...state.orders.map(x => x.id))

		localStorage.setItem(
			'CRM_REACT_ORDERS',
			JSON.stringify({
				...state,
				orders: [...state.orders, { id, ...action.payload }],
			})
		)

		return {
			...state,
			orders: [...state.orders, { id, ...action.payload }],
		}
	}

	return { ...state }
}
