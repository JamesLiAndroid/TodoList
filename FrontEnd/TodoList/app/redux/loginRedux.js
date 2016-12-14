const types = {
	ADD_USERNAME: 'ADD_USERNAME',
	ADD_PASSWORD: 'ADD_PASSWORD'
}

export const actionCreators = {
	addUserName: (username) => {
		console.log('username:'+username)
		return {type: types.ADD_USERNAME, payload: username}
	},

	addPassword: (password) => {
    console.log('password:'+password)
		return {type: types.ADD_PASSWORD, payload: password}
	}
}

const initialState = {
	username: '',
	password: ''
}


export const reducer = (state = initialState, action) => {
	const {username, password} = state
	const {type, payload} = action
  console.log('Action: type:::::'+type+'::::::'+'payload:::'+payload)
	switch(type) {
		case types.ADD_USERNAME: {
      console.log('添加姓名！'+username)
			return {
				...state,
				username: payload
			}
		}
		case types.ADD_PASSWORD: {
      console.log('添加密码！'+password)
			return {
				...state,
				password: payload
			}
		}

		default: {
			return state
		}
	}
}
