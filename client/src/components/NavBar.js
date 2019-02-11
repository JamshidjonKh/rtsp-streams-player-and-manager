import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { logoutUser } from '../store/actions/authentication'

class NavBar extends Component {
	onLogout = e => {
		e.preventDefault()
		const { logoutUser, history } = this.props
		logoutUser(history)
	}

	render() {
		const {isAuth, user} = this.props.auth
		const authLinks = (
			<ul className="navbar-nav ml-auto">
				<div className="nav-link" onClick={ this.onLogout }>
					<img src={user.avatar} alt={user.name} title={user.name}
						className="rounded-circle"
						style={{ width: '25px', marginRight: '5px'}} />
					<span>{user.name}</span>
				</div>
			</ul>
		)
		const guestLinks = (
			<ul className="navbar-nav ml-auto">
				<li className="nav-item">
					<Link className="nav-link" to="/register">Sign Up</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" to="/login">Sign In</Link>
				</li>
			</ul>
		)
		return(
			<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
				<Link className="navbar-brand" to="/">Senior Task</Link>
				<div className="collapse navbar-collapse" id="navbarSupportedContent">
					{isAuth ? authLinks : guestLinks}
				</div>
			</nav>
		)
	}
}

NavBar.propTypes = {
	logoutUser: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth
})

export default connect(mapStateToProps, { logoutUser })(withRouter(NavBar))