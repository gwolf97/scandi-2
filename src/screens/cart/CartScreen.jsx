import React from 'react'
import { Header} from '../../components'
import {useSelector} from "react-redux"
import "./cart.css"


const CartScreen = () => {

  const cart = useSelector(state => state.cart.cartItems)

  const cartArray = Object.values(cart)

  console.log(cartArray)
  
  return (
    <div>
      <Header/>
      <div className='list-container'>
           {cartArray.map(item => (
            <div className='item-container'>
                <div className='details-container'>
                  <div className='item-name'>{item.name}</div>
                  <div className='item-brand'>{item.brand}</div>
                  <div className='item-price-container'>
                    <div className='item-price-symbol'>{item.prices[0].currency.symbol}</div>
                    <div className='item-price'>{item.prices[0].amount}</div>
                  </div>
                  <div>
                    {Object.entries(item.selectedAttributes)
                    .map(([key, value]) => (
                    <div className='attributes-container'>
                      <div className='attribute-key'>{key.toUpperCase()}:</div>
                      <div 
                          className='attribute-value' 
                          style={
                            key.toLocaleLowerCase() === "color" 
                            ? {
                                backgroundColor:`${value.value}`, 
                                color:`${value.value}`,
                                border: "1px solid #5ece7b",
                                width:"32px",
                                height:"32px"
                              }
                            :{background:"black"}
                            }>
                        {value.displayValue}
                      </div>
                    </div> 
                    ))}
                  </div>
                </div>

                <div className='item-gallery-qty-container'>
                  <div className='item-qty-container'>
                    <div className='item-qty-add'>add</div>
                    <div className='item-qty'>{item.qty}</div>
                    <div className='item-qty-sub'>sub</div>
                  </div>
                  <div className='item-gallery-container'>
                    {item.gallery.map(img => (
                    <img src={img}/>
                    ))}
                  </div>
                </div>
            </div>
           ))} 
      </div>
    </div>
  )
}

export default CartScreen