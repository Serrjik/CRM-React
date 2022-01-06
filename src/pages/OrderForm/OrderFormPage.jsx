import React from 'react'
import { useHistory } from 'react-router-dom'
import useDatabase from '../../database/useDatabase'

export default function OrderFormPage() {
	const history = useHistory()

	const { createOrder } = useDatabase()

	const newOrder = () => {
		// console.log('createOrder')

		createOrder()

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
									type='text'
									className='form-control'
									defaultValue='Сергей Лазонка'
									placeholder='Сергей Лазонка'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-2 col-form-label'>
								Заказ:
							</label>
							<div className='col-sm-10'>
								<select className='form-control'>
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
					</div>
					<div className='card-footer d-flex justify-content-end'>
						<button className='btn btn-success' onClick={newOrder}>
							Отправить
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
