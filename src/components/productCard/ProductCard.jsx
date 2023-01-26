import React from 'react'
import "./productCard.css"

const ProductCard = ({brand, gallery, id, inStock, name, prices}) => {
  return (
    <div className='card'>
        <div className='img-container'>
          {!inStock && (<div className='out-of-stock-overlay'>out of stock</div>)}
          <img src={gallery[0]} alt={name} />
        </div>
        <div className='card-cart-button'>
          
        </div>
        <div className='title-price-container'>
          <p>{brand} {name}</p>
          <p>{prices[0].currency.symbol}{prices[0].amount}</p>
        </div>
    </div>
  )
}

export default ProductCard