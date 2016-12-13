const types = {
	ADD_USERNAME: 'ADD_USERNAME',
	ADD_PASSWORD: 'ADD_PASSWORD'
}

const initialState = {
	username: '',
	password: ''
}

export const actionCreators = {
	addUserName: (username) => {
		return {type: types.ADD_USERNAME, payload: username}
	},

	addPassword: (password) => {
		return {type: types.ADD_PASSWORD, payload: password}
	}
}

export const reducer = (state = initialState, action) => {
	const {username, password} = state
	const {type, payload} = action

	switch(type) {
		case types.ADD_USERNAME: {
			return {
				...state,
				username: username
			}
		}
		case types.ADD_PASSWORD: {
			return {
				...state,
				password: password
			}
		}

		default: {
			return state
		}
	}
}