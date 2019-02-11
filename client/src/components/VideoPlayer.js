import React, { PureComponent } from 'react'
import {jsmpeg } from 'jsmpeg'
import {Helmet} from "react-helmet";

class VideoPlayer extends PureComponent {

	state = { count: 0 };
	componentWillMount() {
		
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
						var ws = new WebSocket("ws://localhost:9999");
						var player = new jsmpeg(ws, {canvas:canvas, autoplay:true,audio:false,loop: true});
						
						`
					}]} />

			</div>
		)			
	}
}

export default VideoPlayer