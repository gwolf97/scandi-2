import React,{ useState } from 'react'
import "./productCard.css"

const ProductCard = ({brand, gallery, id, inStock, name, prices}) => {

  const [showCartBtn, setShowCartBtn] = useState(false)

  const handleMouseOver = () => {
    setShowCartBtn(true)
  }

  const handleMouseOut = () => {
    setShowCartBtn(false)
  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='card'>
        <div className='img-container'>
          {!inStock && (<div className='out-of-stock-overlay'>out of stock</div>)}
          <img src={gallery[0]} alt={name} />
        </div>
        {showCartBtn && inStock && (
          <div className='card-cart-button'>
            <img src="./images/white-cart.png" alt="cart" />
              <div className="wheels">
                <img src="./images/white-wheel.png" alt="wheel" />
                <img src="./images/white-wheel.png" alt="wheel" />
              </div>
          </div>
        )}
        <div className='title-price-container'>
          <p className='title'>{brand} {name}</p>
          <p className='price'>{prices[0].currency.symbol}{prices[0].amount}</p>
        </div>
    </div>
  )
}

export default ProductCard