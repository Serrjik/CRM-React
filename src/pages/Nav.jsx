import React from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
	return (
		<nav
			className="col-md-2 d-none d-md-block bg-light sidebar"
			style={{ height: '100vh' }}
		>
			<div className="sidebar-sticky">
				<Link
					to={'/order/'}
					className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-decoration-none"
				>
					<button type="button" className="btn btn-primary">
						Новый заказ
					</button>
				</Link>

				<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1">
					Режимы
				</h6>

				<ul className="nav flex-column">
					<li className="nav-item">
						<a className="nav-link active" href="/">
							<img
								src="./assets/data-collection.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Все заказы
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/new.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Новые
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/innovation.png"
								alt=""
								style={{ width: '30px' }}
							/>
							На исполнение
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/back.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Возврат
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/compressed.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Заархивированные
						</a>
					</li>
				</ul>

				<h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
					Последние просматриваемые
				</h6>
				<ul className="nav flex-column mb-2">
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/arrow.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Максим Анатольевич
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/arrow.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Серьгей Дмитриевич
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/arrow.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Ольга Арбузова
						</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/">
							<img
								src="./assets/arrow.png"
								alt=""
								style={{ width: '30px' }}
							/>
							Максимус Валькиш
						</a>
					</li>
				</ul>
			</div>
		</nav>
	)
}
