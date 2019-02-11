import { GET_STREAMS } from '../actions/types'

const initialState = {
	streams: []
}

export default (state = initialState, action) => {
	switch (action.type) {
		case GET_STREAMS:
			return {
				...state,
				streams: action.payload,
			}
		default:
			return state
	}
}