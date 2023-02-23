import React from 'react'
import { Header} from '../../components'
import {useDispatch, useSelector} from "react-redux"
import "./cart.css"
import { addToCart, removeFromCart } from '../../actions/cartActions'
import { useNavigate } from 'react-router-dom'

const CartScreen = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        <Header/>
      {cart.length === 0 ? (<div className='empty-cart'>NO ITEMS</div>) : (<><div className='list-container'>
           {cartArray.map((item, index) => (
            <div key={item.id + index} className='item-container'>
                <div className='details-container'>
                  <div onClick={() => navigate(`/${item.category}/${item.id}`)} className='item-name'>{item.name}</div>
                  <div className='item-brand'>{item.brand}</div>
                  <div className='item-price-container'>
                    <div className='item-price-symbol'>{item.prices[currency].currency.symbol}</div>
                    <div className='item-price'>{item.prices[currency].amount}</div>
                  </div>
                  <div>
                    {item.attributes
                    .map((att) => (
                    <div key={att.id +  index} className='attributes-container'>
                      <div className='attribute-key'>{att.id.toUpperCase()}:</div>
                      <div className='attribute-values-container'>
                        {att.items.map(val => (
                          <div 
                              key={val.displayValue +  index}
                              className='attribute-value' 
                              style={
                                att.id.toLocaleLowerCase() === "color" && val.displayValue === item.selectedAttributes[att.id].displayValue 
                                ? {
                                    backgroundColor:`${val.value}`, 
                                    color:`${val.value}`,
                                    width:"32px",
                                    height:"32px",
                                    fontSize:"0",
                                    border:"none",
                                    boxShadow: "0 0 0 1px white, 0 0 0 3px #5ECE7B",
                                  }
                                : att.id.toLocaleLowerCase() === "color"
                                ? {
                                  backgroundColor:`${val.value}`, 
                                  color:`${val.value}`,
                                  width:"32px",
                                  height:"32px",
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

                <div className='item-gallery-qty-container'>
                  <div className='item-qty-container'>
                    <div onClick={() => handleAdd(item)} className='item-qty-add'>+</div>
                    <div className='item-qty'>{item.qty}</div>
                    <div onClick={() => handleSubtract(item)} className='item-qty-sub'>-</div>
                  </div>
                  <div className='item-gallery-container'>
                      {item.gallery.map(img => (
                        <img key={img + index} src={img} alt="gallery item"/>
                      ))}
                  </div>
                   {item.gallery.length > 1 && (
                    <>
                      <div onClick={(e) => e.target.parentElement.children[1].scrollBy(-100, 0)}  className='arrow-container-left'>
                        <img src="./images/gallery-left.png" alt="left button" className="gallery-left" />
                      </div>
                      <div onClick={(e) => e.target.parentElement.children[1].scrollBy(100, 0)} className='arrow-container-right'>
                        <img src="./images/gallery-left.png" alt="right button" className="gallery-right" />
                      </div>
                    </>)}
                </div>
            </div>
           ))} 
      </div>
      <div className='total-container'>
          <p>Tax: <span>{cart[0].prices[currency].currency.symbol}0</span></p>
          <p>Quantity: <span>{sumQty(cart)}</span></p>
          <p>Total: <span>{cart[0].prices[currency].currency.symbol}{total(cart).toFixed(2)}</span></p>
          <div className='order-btn'>ORDER</div>
      </div></>)}
    </div>
  )
}

export default CartScreen