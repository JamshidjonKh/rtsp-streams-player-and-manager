import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import jwtDecode from 'jwt-decode'

import { setCurrentUser, logoutUser } from './store/actions/authentication'

import store from './store/index'

import setAuthToken from './setAuthToken'

import NavBar from './components/NavBar'
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'

import 'bootstrap/dist/css/bootstrap.min.css'

/* console.log('localStorage.jwtToken: ', localStorage.jwtToken);
if (localStorage.jwtToken) {
	setAuthToken(localStorage.jwtToken)
	const decoded = jwtDecode(localStorage.jwtToken)
	store.dispatch(setCurrentUser(decoded))

	const currentTime = new Date() / 1000
	if (decoded.exp < currentTime) {
		store.dispatch(logoutUser())
		window.location.href = '/login'
	}
} */

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<div>
						<NavBar />
						<Route exact path="/" component={Home} />
						<div className="container">
							<Route exact path="/register" component={Register}/>
							<Route exact path="/login" component={Login} />
						</div>
					</div>
					
				</Router>
			</Provider>
			
		)
	}
}

export default App
