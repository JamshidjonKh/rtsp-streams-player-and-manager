import React, { PureComponent } from 'react'
import classNames from 'classnames'
import {Button} from 'react-bootstrap'
import { getRtsp } from '../store/actions/streams'
import Home from './Home';

import {jsmpeg } from 'jsmpeg'
import {Helmet} from "react-helmet";
const ws = require('ws');

const URL = 'ws://localhost:9999';

class VideoPlayer extends PureComponent {

	state = { count: 0 };
	componentWillMount() {
		this.ws = new WebSocket(URL);

	
		console.log('am i here?');
		this.ws.onopen = () => {
		  // on connecting, do nothing but log it to the console
		  console.log('connected')
		  this.render();
		};

		
	
	
		this.ws.onclose = () => {
		  console.log('disconnected')
		  // automatically try to reconnect on connection loss
		  this.setState({
			ws: new WebSocket(URL),
		  })
		};

		
	  }




	render() {
		return (
			<div>
				<canvas id="videoCanvas" width="240" height="160"></canvas>
			<Helmet 
  script={[{ 
    type: 'text/javascript', 
	innerHTML: `
	
	var canvas = document.getElementById('videoCanvas');
	var ws = new WebSocket("ws://localhost:9999")
	
	   var player = new jsmpeg(ws, {canvas:canvas, autoplay:true,audio:false,loop: true});
	
	`
  }]} />

</div>
		)			
	}
}

export default VideoPlayer