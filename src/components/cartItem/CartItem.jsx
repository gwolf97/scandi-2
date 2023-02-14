import React from 'react'

const CartItem = (name,brand,price,attributes) => {
  return (
    <div>
        <div>{name}</div>
        <div>{brand}</div>
    </div>
  )
}

export default CartItem