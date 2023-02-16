import { CART_ADD_ITEM, CART_REMOVE_ITEM} from "../constants/cartConstants"


export const cartReducer = (state = {cartItems: []}, action) =>{
    switch(action.type){
        case CART_ADD_ITEM:
            const item = action.payload
      
            const existItem = state.cartItems.find(x => x.id === item.id && JSON.stringify(x.selectedAttributes) === JSON.stringify(item.selectedAttributes))
      
            if (existItem) {
              return {
                ...state,
                cartItems: state.cartItems.map(x => {
                  if (x.id === item.id && JSON.stringify(x.selectedAttributes) === JSON.stringify(item.selectedAttributes)) {
                    return {
                      ...x,
                      qty: x.qty + 1
                    }
                  }
                  return x
                })
              }
            } else {
                return {
                  ...state,
                  cartItems: [...state.cartItems, item]
                }
              }
              case CART_REMOVE_ITEM:
                const removeItem = action.payload
                const isExistItem = state.cartItems.find(x => x.id === removeItem.id && JSON.stringify(x.selectedAttributes) === JSON.stringify(removeItem.selectedAttributes))
                if (isExistItem) {
                  return {
                    ...state,
                    cartItems: state.cartItems.map(x => {
                      if (x.id === removeItem.id && JSON.stringify(x.selectedAttributes) === JSON.stringify(removeItem.selectedAttributes) && x.qty > 1) {
                        return {
                          ...x,
                          qty: x.qty - 1
                        }
                      } else if (x.id === removeItem.id && JSON.stringify(x.selectedAttributes) === JSON.stringify(removeItem.selectedAttributes) && x.qty === 1) {
                        return null
                      }
                      return x
                    }).filter(x => x !== null)
                  }
                } else {
                  return state
                }                    
            default:
              return state
          }
        }