import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import { getStreams, postRequest } from '../store/actions/streams'
import Card from './Card';
import VideoPlayer from './VideoPlayer'


class Home extends Component {
	state = {
		title: '',
		url: '',
		done: false
	}

	getRandomKey = docId => {
		this.setState({ randomKey: Math.random() });
	  };

	componentDidMount() {
		this.props.getStreams()
	}

	handleInputChange = e => {
		const target = e.target
		this.setState({
			[target.name]: target.type === 'checkbox' ? target.checked : target.value,
		})
	}

	handleSubmit = e => {
		e.preventDefault()
		const { postRequest, auth } = this.props
		const { title, url, done } = this.state
		const userID = auth.user.id
		const stream = { title, url, done }
		postRequest('create', { userID, stream })
		this.setState({
			title: '',
			url: '',
			done: false,
		})
	}

	onRemoveStream = streamID => {
		const { postRequest, auth } = this.props
		const userID = auth.user.id
		postRequest('remove', { userID, streamID })
	}

	onRemoveAllStream = () => {
		const { postRequest, auth } = this.props
		const userID = auth.user.id
		postRequest('removeAll', userID)
	}

	onEditStream = stream => {
		const { postRequest, auth } = this.props
		const userID = auth.user.id
		postRequest('edit', { userID, stream })
	}

	render() {
		const { auth, streams } = this.props

		if (!auth.isAuth) return <Redirect to='/login' />

		return (
			<div className="container">
				<h1>Streams</h1>

				<form onSubmit={this.handleSubmit} className="mb-3">
					<h2>Create stream</h2>
					<div className="form-group">
						<label htmlFor="streamTitle">Stream Title</label>
						<input type="text" className="form-control" id="streamTitle" placeholder="Title..." name="title" value={this.state.title} onChange={this.handleInputChange}/>
					</div>
					<div className="form-group">
						<label htmlFor="streamUrl">url</label>
						<input type="text" className="form-control" id="streamUrl" placeholder="rtsp://" name="url" value={this.state.url} onChange={this.handleInputChange}/>
					</div>
					<button type="submit" className="btn btn-primary">
						Add Stream
					</button>
				</form>

				<div className="row mb-3">
					<h2 className="col-auto mr-auto">Video Player</h2>
					<VideoPlayer/>
				</div>

				<div className="row mb-3">
					<h2 className="col-auto mr-auto">Streams list</h2>
					<button className="btn btn-danger coll-auto" onClick={this.onRemoveAllStream}>Delete All</button>
				</div>
				<div className="card-columns">
					{
						// Stream
						streams.streams.map(stream => {
							return (
								<Card {...stream} removeStream={this.onRemoveStream} editStream={this.onEditStream} key={stream.id}/>
							)
						})
					}
				</div>
			</div>
		)
	}
}

Home.propTypes = {
	getStreams: PropTypes.func.isRequired,
	postRequest: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	auth: state.auth,
	streams: state.streams
})

export default connect(mapStateToProps, { getStreams, postRequest })(withRouter(Home))