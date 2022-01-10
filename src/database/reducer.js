import { UPDATE_ORDER, CREATE_ORDER } from './Boilerplate'

export default function reducer(state, action) {
	if (action.type === UPDATE_ORDER) {
		return {
			...state,
			orders: state.orders.map(order => {
				if (order.id !== action.id) {
					return order
				}

				return Object.assign({}, order, action.data)
			}),
		}
	}

	if (action.type === CREATE_ORDER) {
		const id = 1 + Math.max(0, ...state.orders.map(x => x.id))
		return {
			...state,
			orders: [...state.orders, { id, ...action.payload }],
		}
	}

	return { ...state }
}
