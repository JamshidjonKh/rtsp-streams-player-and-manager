import React, { PureComponent } from 'react'
import classNames from 'classnames'
import {Button} from 'react-bootstrap'
import { getRtsp } from '../store/actions/streams'
class Card extends PureComponent {
	state = {
		title: '',
		url: '',
		done: false,
		editing: false,
		randomKey: Math.random()
	}

	getRandomKey = docId => {
		console.log('getRandomKey');
		this.setState({ randomKey: Math.random() });
	  }
	

	constructor () {
		super()
		this.playInBrowser = this.playInBrowser.bind(this)
	  }
	
	  playInBrowser () {
		 console.log('this.state.url: ', this.state.url)
		let res = getRtsp(this.state.url);
		
		
	  }


	handleScriptInject({ scriptTags }) {
		if (scriptTags) {
			const scriptTag = scriptTags[0];
			scriptTag.onload = this.handleOnLoad;
		}
	}

	componentDidMount() {
		this.setState({
			title: this.props.title,
			url: this.props.url,
			done: this.props.done,
		})

	}

	handleInputChange = e => {
		const target = e.target
		this.setState({
			[target.name]: target.type === 'checkbox' ? target.checked : target.value,
		})
	}

	saveStream = () => {
		const { title, url, done } = this.state
		const { id, editStream } = this.props
		const stream = {
			id,
			title,
			url,
			done
		}
		
		editStream(stream)
		this.setState({
			editing: false
		})
	}

	editMode = () => {
		const { title, url, done } = this.state
		return (
			<div className={classNames({
				"bg-dark": !done,
				"bg-success": done
			}, "card", "mb-3", "text-white")}>
				<div className="card-body">
					<input type="text" name="title" className="card-title form-control" value={title} onChange={this.handleInputChange}/>
					<textarea name="url" className="card-text form-control mb-3" rows="4" value={url} onChange={this.handleInputChange}/>
					<div className="form-group form-check">
						<input type="checkbox" className="form-check-input" id="streamDone" name="done" onChange={this.handleInputChange} checked={done}/>
						<label className="form-check-label" htmlFor="streamDone">Done</label>
					</div>
					<button className="btn btn-success mr-3" onClick={this.saveStream}>Save</button>
					<button className="btn btn-danger" onClick={() => this.setState({editing: false})}>Сancel</button>
				</div>
			</div>
		)
	}

	readMode = () => {
		const { id, title, url, done, removeStream } = this.props
		return (

			

			<div className={classNames({
				"bg-dark": !done,
				"bg-success": done
			}, "card", "mb-3", "text-white")}>
				<div className="card-body">
					<h5 className="card-title">{title}</h5>
					<p className="card-text">{url}</p>
					<button className="btn btn-danger mr-3" onClick={() => removeStream(id)}>Delete</button>
					<button className="btn btn-secondary mr-3" onClick={() => this.setState({editing: true})}>Edit</button>
						<Button onClick={() => { this.playInBrowser()}} variant="success">Play in browser</Button>
						<Button onClick={()=> window.open(this.props.url, "_blank")} variant="success">Play in external player</Button>
				</div>
			</div>
		)
	}

	render() {
		return (
			
			this.state.editing ? this.editMode() : this.readMode()
		)
	}
}

export default Card