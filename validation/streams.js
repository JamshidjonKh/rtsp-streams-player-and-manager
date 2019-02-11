const validator = require('validator')
const isEmpty = require('../helpers/isEmpty')

module.exports = function validateCreatedStreamInput(data) {
	let errors = {}
	data.title = !isEmpty(data.title) ? data.title : ''
	data.url = !isEmpty(data.url) ? data.url : ''

	if(!validator.isLength(data.title, { min: 2, max: 60 })) {
		errors.title = 'Name must be between 2 to 60 chars'
	}
	
	if(validator.isEmpty(data.title)) {
		errors.title = 'Title field is required'
	}
	
	if(validator.isEmpty(data.url)) {
		errors.url = 'URL is required';
	}

	if(!validator.isLength(data.url, {min: 0, max: 1000})) {
		errors.url = "URL can't have more 1000 chars"
	}

	return {
		errors,
		isValid: isEmpty(errors)
	}
}