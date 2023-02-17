import {createStore, combineReducers, applyMiddleware, } from "redux"
import thunk from "redux-thunk"
import {composeWithDevTools} from "redux-devtools-extension"
import { cartReducer } from "./reducers/cartReducer"

const reducer = combineReducers({
    cart: cartReducer
})

const cartItemsFromStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []
const currencyFromStorage = localStorage.getItem("currency") ? JSON.parse(localStorage.getItem("currency")) : 0

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        currency: currencyFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store