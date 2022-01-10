import React from 'react'
import ReactDOM from 'react-dom'

import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'
import { DatabaseProvider } from './database/database'

const rootElement = document.getElementById('root')

ReactDOM.render(
	<React.StrictMode>
		<Router>
			<DatabaseProvider>
				<App />
			</DatabaseProvider>
		</Router>
	</React.StrictMode>,
	rootElement
)

// /order/1/edit
