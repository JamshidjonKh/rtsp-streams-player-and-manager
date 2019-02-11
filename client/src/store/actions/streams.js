import axios from 'axios'
import {
	GET_ERRORS,
	GET_STREAMS
} from './types'

export const getStreams = () => dispatch => {
	axios
		.get('/api/streams/get')
		.then(res => dispatch(updateStreamsInState(res.data)))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}


export const getRtsp = (url) => {
	console.log('url: ',url);
	axios
		.post('/api/rtsp', {"url":url})
		.then(res => "success2")
		
		.catch(err => 
			"err"
		)
}

export const postRequest = (url, data) => dispatch => {
	axios
		.post(`/api/streams/${url}`, data)
		.then(res => dispatch(updateStreamsInState(res.data)))
		.catch(err => 
			dispatch({
				type: GET_ERRORS,
				payload: err,
			})
		)
}

export const updateStreamsInState = streams => ({
	type: GET_STREAMS,
	payload: streams
})