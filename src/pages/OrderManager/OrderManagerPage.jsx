// Редактирование заказа.
import React from 'react'

import { useParams } from 'react-router-dom'

import MainWrapper from '../MainWrapper'

export default function OrderManagerPage() {
	// We can use the `useParams` hook here to access
	// the dynamic pieces of the URL.
	// let { id } = useParams();

	const params = useParams()
	const id = parseInt(params.orderId)

	// const id = window.location.pathname.split("/").pop();

	return (
		<MainWrapper>
			<main
				role='main'
				className='col-md-9 ml-sm-auto col-lg-10 px-4 d-flex flex-column p-2'
			>
				<div className='card'>
					<div className='card-header'>
						<h2>Серьгей Лазонка</h2>
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
									type='text'
									className='form-control'
									defaultValue='Серьгей Лазонка'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Заказ:
							</label>
							<div className='col-sm-11'>
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
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Дата:
							</label>
							<div className='col-sm-11'>
								<input
									type='date'
									className='form-control'
									defaultValue='2020-03-03'
								/>
							</div>
						</div>
						<div className='form-group row'>
							<label className='col-sm-1 col-form-label'>
								Статус:
							</label>
							<div className='col-sm-11'>
								<select className='form-control'>
									<option defaultValue>На исполнение</option>
									<option>Возврат</option>
									<option>Заархивированно</option>
									<option>Новый</option>
								</select>
							</div>
						</div>
					</div>
					<div className='card-footer d-flex justify-content-end'>
						<button className='btn btn-success'>Сохранить</button>
						{/* <!-- <button className="btn btn-success" disabled>Сохранить</button> --> */}
					</div>
				</div>
			</main>
		</MainWrapper>
	)
}
