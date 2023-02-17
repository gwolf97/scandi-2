import { CART_ADD_ITEM, CART_REMOVE_ITEM, CHANGE_CURRENCY} from "../constants/cartConstants"

export const addToCart = (item) => async (dispatch, getState) =>{    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            ...item
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (item) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: {...item}
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const changeCurrency = (currency) => (dispatch, getState) => {
    dispatch({
        type: CHANGE_CURRENCY,
        payload: {currency}
    })

    localStorage.setItem("currency", JSON.stringify(getState().cart.currency))
}