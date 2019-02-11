import { combineReducers } from 'redux'

import errors from './errors'
import auth from './auth'
import streams from './streams'

export default combineReducers({
	errors,
	auth,
	streams
})
