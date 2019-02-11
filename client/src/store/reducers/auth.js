import { SET_CURRENT_USER } from '../actions/types'
import isEmpty from '../../helpers/isEmpty'

const initialState = {
	isAuth: false,
	user: {}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuth: !isEmpty(action.payload),
				user: action.payload
			}
		default:
			return state
	}
}