import { CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants"

export const addToCart = (item) => async (dispatch, getState) =>{    
    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            ...item
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM,
        payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}