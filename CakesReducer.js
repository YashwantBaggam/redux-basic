const redux = require('redux')
const createStore = redux.createStore

import buyCake from '../actions/ActionCreator'

const initialState = {
    numberofCakes = 10
}

const updateCakes = (state = initialState, { type, payload }) => {
    switch (type) {

    case BUY_CAKE:
        return { 
            ...state, 
            numberofCakes : state.numberofCakes - 1
        }

    default:
        return state
    }
}


export default updateCakes


const store = createStore(updateCakes)
console.log('initialState',store.getState())

const unsubsribe = store.subscribe(()=> console.log('updatedState',store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())  
unsubscribe()
