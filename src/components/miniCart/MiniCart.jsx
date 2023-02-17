import React from 'react'
import { Header} from '../../components'
import {useDispatch, useSelector} from "react-redux"
import "./miniCart.css"
import { addToCart, removeFromCart } from '../../actions/cartActions'

const MiniCart = () => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart.cartItems)
    const currency = useSelector(state => state.cart.currency)
  
    const cartArray = Object.values(cart)
  
    const sumQty = (items) => {
      const totalQty = items.reduce((acc, item) => {
        return acc + item.qty;
      }, 0);
    
      return totalQty;
    };
  
    const total = (items) => {
      return items.reduce((acc, item) => {
        const price = item.prices[currency].amount;
        const qty = item.qty;
        return acc + (price * qty);
      }, 0);
    }
  
    const handleAdd = (product) => {
      dispatch(addToCart(product))
    }
  
    const handleSubtract = (product) => {
      dispatch(removeFromCart(product))
    } 
    
    return (
      <div>
        <div className='mini-list-container'>
            <div className='mini-qty'>
                My Bag,<span>{sumQty(cart)} item{sumQty(cart) > 1 && "s"}</span>
            </div>
            <div className='mini-items-container'>
             {cartArray.map(item => (
              <div className='mini-item-container'>
                  <div className='mini-details-container'>
                    <div className='mini-item-name'>{item.name}</div>
                    <div className='mini-item-brand'>{item.brand}</div>
                    <div className='mini-item-price-container'>
                      <div className='mini-item-price-symbol'>{item.prices[currency].currency.symbol}</div>
                      <div className='mini-item-price'>{item.prices[currency].amount}</div>
                    </div>
                    <div>
                      {item.attributes
                      .map((att) => (
                      <div className='mini-attributes-container'>
                        <div className='mini-attribute-key'>{att.id.toUpperCase()}:</div>
                        <div className='mini-attribute-values-container'>
                          {att.items.map(val => (
                            <div 
                                className='mini-attribute-value' 
                                style={
                                  att.id.toLocaleLowerCase() === "color" && val.displayValue === item.selectedAttributes[att.id].displayValue 
                                  ? {
                                      backgroundColor:`${val.value}`, 
                                      color:`${val.value}`,
                                      width:"20px",
                                      height:"20px",
                                      fontSize:"0",
                                      border:"1px solid #5ECE7B",
                                    }
                                  : att.id.toLocaleLowerCase() === "color"
                                  ? {
                                    backgroundColor:`${val.value}`, 
                                    color:`${val.value}`,
                                    width:"20px",
                                    height:"20px",
                                    fontSize:"0",
                                    border:"none"
                                  }
                                  : val.displayValue === item.selectedAttributes[att.id].displayValue 
                                  ? {background:"#1D1F22", color:"#ffffff"}
                                  : {background:""}
                            }>
                              {val.displayValue}
                            </div>
                          ))}
                        </div>
                      </div> 
                      ))}
                    </div>
                  </div>
  
                  <div className='mini-item-gallery-qty-container'>
                    <div className='mini-item-qty-container'>
                      <div onClick={() => handleAdd(item)} className='mini-item-qty-add'>+</div>
                      <div className='mini-item-qty'>{item.qty}</div>
                      <div onClick={() => handleSubtract(item)} className='mini-item-qty-sub'>-</div>
                    </div>
                    <div className='mini-item-gallery-container'>
                        {item.gallery.map(img => (
                          <img src={img}/>
                        ))}
                    </div>
                     {item.gallery.length > 1 && (
                      <>
                        <div onClick={(e) => e.target.parentElement.children[1].scrollBy(-100, 0)}  className='mini-arrow-container-left'>
                          <img src="./images/gallery-left.png" alt="" className="mini-gallery-left" />
                        </div>
                        <div onClick={(e) => e.target.parentElement.children[1].scrollBy(100, 0)} className='mini-arrow-container-right'>
                          <img src="./images/gallery-left.png" alt="" className="mini-gallery-right" />
                        </div>
                      </>)}
                  </div>
              </div>
             ))} 
             </div>
            <div className='mini-total-container'>
                <div className='mini-total'>
                    <p>Total:</p>
                    <p className='mini-amount'>{cart[0].prices[currency].currency.symbol}{total(cart).toFixed(2)}</p>
                </div>
                <div className='mini-cart-btns-container'>
                    <div className='mini-view-bag-btn'>VIEW BAG</div>
                    <div className='mini-check-out-btn'>CHECK OUT</div>
                </div>
            </div>
        </div>
      </div>
    )
}

export default MiniCart