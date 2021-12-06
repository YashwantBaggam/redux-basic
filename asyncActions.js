const redux = require('redux')
const createStore = redux.createStore

const applyMiddleWare =  redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')


const initialState = {
    loading:false,
    users:[],
    error: '',
}

const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST'
const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS'
const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE'

//action creators

const fetchUserRequest = ()=>{
    return {
        type: FETCH_USER_REQUEST
    }
}
const fetchUserSuccess = ()=>{
    return {
        type: FETCH_USER_SUCCESS,
        payload: users
    }
}
const fetchUserFailure = ()=>{
    return {
        type: FETCH_USER_FAILURE,
        payload: error
    }
}

//reducers


const reducer =  (state = initialState, { type, payload }) => {
    switch (type) {
    case FETCH_USER_REQUEST:
        return { ...state, loading:true }
    case FETCH_USER_SUCCESS:
        return { ...state, loading:false, users: payload }
    case FETCH_USER_FAILURE:
        return { ...state, loading:false, error: payload}

    default:
        return state
    }
}

//Async Action creator - unlike reducer which is a pure function
const fetchUsers =()=>{
    return function (dispatch){
        dispatch(fetchUserRequest())

        axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response=>{
            const users = response.data.map(user=>user.id)
            dispatch(fetchUserSuccess(users))
        })
        .catch(err=>{            
            dispatch(fetchUserFailure(err.message))
        })
    }
}



const store = createStore(reducer,applyMiddleWare(thunkMiddleWare))

// fetchUsers()
store.subscribe(()=>{console.log(store.getState())})
store.dispatch(fetchUsers())