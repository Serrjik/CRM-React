import React, { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import useDatabase from '../../database/useDatabase'

export default function OrderFormPage() {
	const history = useHistory()

	const { createOrder } = useDatabase()

	const fullnameRef = useRef()
	const goodRef = useRef()
	const priceRef = useRef()

	const makeOrder = () => {
		const newOrder = {
			fullname: fullnameRef.current.value,
			status: 'new',
			price: priceRef.current.value,
			good: goodRef.current.value,
			date: Date.now(),
		}

		createOrder(newOrder)
		history.push(`/`)
	}

	return (
		<div
			className='d-flex justify-content-center'
			style={{ height: '100vh' }}
		>
			<div className='d-flex flex-column justify-content-center'>
				<div className='card' style={{ width: '500px' }}>
					<div className='card-header'>
						<h2>Новый заказ</h2>
					</div>
					<div className='card-body'>
						<div className='form-group row'>
							<label className='col-sm-2 col-form-label'>
								ФИО:
							</label>
							<div className='col-sm-10'>
								<input
									ref={fullnameRef}
									type='text'
									className='form-control'
									placeholder='Иван Иванов'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-2 col-form-label'>
								Заказ:
							</label>
							<div className='col-sm-10'>
								<select ref={goodRef} className='form-control'>
									<option defaultValue>
										Бумага для принтера
									</option>
									<option>Краски для принтера</option>
									<option>Картриджи для принтера</option>
									<option>Принтер</option>
									<option>Полимерная ванна</option>
								</select>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-2 col-form-label'>
								Цена:
							</label>
							<div className='col-sm-10'>
								<input
									type='number'
									className='form-control'
									defaultValue='0'
									min='0'
									ref={priceRef}
									data-order-price
								/>
							</div>
						</div>
					</div>

					<div className='card-footer d-flex justify-content-end'>
						<button className='btn btn-success' onClick={makeOrder}>
							Отправить
						</button>
						<button
							className='btn btn-danger ml-3'
							onClick={() => history.push(`/`)}
						>
							Отмена
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
