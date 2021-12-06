const redux = require('redux')
const reduxLogger = require('redux-logger')

const createStore = redux.createStore
const combineReducers = redux.combineReducers
const applyMiddleWare = redux.applyMiddleware
//logger
const logger = reduxLogger.createLogger()

//action constants
const BUY_CAKE = "BUY_CAKE"
const BUY_ICECREAM = "BUY_ICECREAM"


//actionCreators
function buyCake() {
    return {
        //actions
        type: BUY_CAKE,
        info: 'First redux action'
    }
}
function buyIceCream() {
    return {
        //actions
        type: BUY_ICECREAM,
        info: 'Second redux action'
    }
}


//reducer(s)
//1
const initialCakeState = {
    numberofCakes : 10
}

const updateCakes = (state = initialCakeState, { type, payload }) => {
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
//2
const initialIceCreamState = {
    numberofIceCreams : 50
}

const updateIceCreams = (state = initialIceCreamState, { type, payload }) => {
    switch (type) {

    case BUY_ICECREAM:
        return { 
            ...state, 
            numberofIceCreams : state.numberofIceCreams - 1
        }

    default:
        return state
    }
}


//combine reducers

const rootReducer = combineReducers({
    iceCream : updateIceCreams,
    Cakes : updateCakes
})

const store = createStore(rootReducer,applyMiddleWare(logger))

console.log('initialState',store.getState())

// const unsubscribe  = store.subscribe(()=> console.log('updatedState',store.getState()))
const unsubscribe  = store.subscribe(()=> {})
store.dispatch(buyCake())
store.dispatch(buyCake())
// store.dispatch(buyCake()) 
// let i= 0
// while (i<10) {
//     store.dispatch(buyIceCream())  
//     i++;
    
// }
store.dispatch(buyIceCream())  
unsubscribe()


