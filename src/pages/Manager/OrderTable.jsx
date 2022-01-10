import React from 'react'

export default function OrderTable(props) {
	return (
		<div className="table-responsive">
			<table className="table table-striped">
				<thead>
					<tr>
						<th>id</th>
						<th>ИФО</th>
						<th>Заказ</th>
						<th>Сумма</th>
						<th>Статус</th>
						<th>Действия</th>
						<th>Дата / Время</th>
					</tr>
				</thead>
				<tbody>
					{props.orders.map(order => (
						<Tr
							order={order}
							key={order.id}
							onEdit={props.onEdit}
						/>
					))}
				</tbody>
			</table>
		</div>
	)
}

const Tr = props => {
	const { order } = props

	// Форматтер даты.
	const dateFormatter = new Intl.DateTimeFormat('ru-Ru')

	return (
		<tr>
			<td>{order.id}</td>
			<td>{order.fullname}</td>
			<td>{order.good}</td>
			<td>{order.price}</td>
			<td>
				<Badge type={order.status} />
			</td>
			<td>
				<button
					className="btn btn-outline-primary btn-sm"
					onClick={() => props.onEdit(order.id)}
				>
					Редактировать
				</button>
			</td>
			<td>{dateFormatter.format(order.date)}</td>
		</tr>
	)
}

const Badge = props => {
	switch (props.type) {
		case 'process':
			return <div className="badge badge-warning">в обработке</div>
		case 'new':
			return <div className="badge badge-primary">новое</div>
		case 'archived':
			return <div className="badge badge-dark">архив</div>
		case 'back':
			return <div className="badge badge-danger">возврат</div>
		default:
			return null
	}
}
