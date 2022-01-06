import React from 'react'
import './styles.css'

import ManagerPage from './pages/Manager/ManagerPage'
import OrderManagerPage from './pages/OrderManager/OrderManagerPage'
import OrderFormPage from './pages/OrderForm/OrderFormPage'

import { Switch, Route } from 'react-router-dom'

export default function App({ page }) {
	return (
		<Switch>
			{/* Новый заказ. */}
			<Route path='/order/' component={OrderFormPage} />

			{/* Редактировать заказ. */}
			<Route path='/editor/:orderId' component={OrderManagerPage} />

			{/* Заказы */}
			<Route path='/'>
				<ManagerPage />;
			</Route>
		</Switch>
	)
}
