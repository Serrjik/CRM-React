// Редактирование заказа.
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { useParams } from 'react-router-dom'

import MainWrapper from '../MainWrapper'
import useDatabase from '../../database/useDatabase'
import { useHistory } from 'react-router-dom'

export default function OrderManagerPage() {
	const history = useHistory()

	const params = useParams()
	const id = parseInt(params.orderId, 10)

	const { getOrderById } = useDatabase()
	const order = getOrderById(id)

	const date = new Date(order.date).toISOString().substring(0, 10)

	const goods = [
		'Бумага для принтера',
		'Краски для принтера',
		'Картриджи для принтера',
		'Принтер',
		'Полимерная ванна',
	]

	const statuses = [
		{ value: 'process', label: 'На исполнение' },
		{ value: 'back', label: 'Возврат' },
		{ value: 'archived', label: 'Заархивированно' },
		{ value: 'new', label: 'Новый' },
	]

	const inputFullnameRef = useRef()
	const inputGoodRef = useRef()
	const inputDateRef = useRef()
	const inputStatusRef = useRef()

	const { updateOrder } = useDatabase()

	const makeUpdateOrder = () => {
		const updatedOrder = {
			fullname: inputFullnameRef.current.value,
			good: inputGoodRef.current.value,
			date: inputDateRef.current.value,
			status: inputStatusRef.current.value,
		}

		updateOrder(order.id, updatedOrder)
		history.push(`/`)
	}

	const [fullName, setFullNameValue] = useState(order.fullname)
	const [good, setGoodValue] = useState(order.good)
	const [dateValue, setDateValue] = useState(date)
	const [status, setStatus] = useState(order.status)

	const fillingTheForm = useCallback(
		(fullName, good, dateValue, status) => {
			setFullNameValue(order.fullname)
			setGoodValue(order.good)
			setDateValue(date)
			setStatus(order.status)
		},
		[order.fullname, order.good, date, order.status]
	)

	useEffect(() => {
		fillingTheForm()
	}, [fillingTheForm, order.fullname, order.good, date, order.status])

	return (
		<MainWrapper>
			<main
				role='main'
				className='col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column p-2'
			>
				<div className='card'>
					<div className='card-header'>
						<h2>{order.fullname}</h2>
					</div>
					<div className='card-body'>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								ID:
							</label>
							<div className='col-sm-11'>
								<input
									type='text'
									className='form-control-plaintext'
									readOnly
									value={id}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								ФИО:
							</label>
							<div className='col-sm-11'>
								<input
									ref={inputFullnameRef}
									type='text'
									className='form-control'
									value={fullName}
									onChange={e =>
										setFullNameValue(e.target.value)
									}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Заказ:
							</label>
							<div className='col-sm-11'>
								<select
									ref={inputGoodRef}
									className='form-control'
									value={good}
									onChange={e => setGoodValue(e.target.value)}
								>
									{goods.map(good => (
										<option
											key={good}
											value={good}
											label={good}
										/>
									))}
								</select>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Дата:
							</label>
							<div className='col-sm-11'>
								<input
									ref={inputDateRef}
									type='date'
									className='form-control'
									value={dateValue}
									onChange={e => setDateValue(e.target.value)}
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Статус:
							</label>
							<div className='col-sm-11'>
								<select
									ref={inputStatusRef}
									className='form-control'
									value={status}
									onChange={e => setStatus(e.target.value)}
								>
									{statuses.map(status => (
										<option
											key={status.value}
											value={status.value}
											label={status.label}
										/>
									))}
								</select>
							</div>
						</div>
					</div>
					<div className='card-footer d-flex justify-content-end'>
						<button
							className='btn btn-success'
							onClick={makeUpdateOrder}
						>
							Сохранить
						</button>
						<button
							className='btn btn-danger ml-3'
							onClick={() => history.push(`/`)}
						>
							Отмена
						</button>
					</div>
				</div>
			</main>
		</MainWrapper>
	)
}
