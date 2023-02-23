import React,{ useState } from 'react'
import "./productCard.css"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import GET_PRODUCT_BY_ID from '../../screens/product/productQueries'
import { addToCart } from '../../actions/cartActions'
import { useQuery } from '@apollo/client'

const ProductCard = ({brand, gallery, category, id, inStock, name, prices}) => {

  const [showCartBtn, setShowCartBtn] = useState(false)

  const dispatch = useDispatch()

  const currency = useSelector(state => state.cart.currency)

  const navigate = useNavigate()

  const handleMouseOver = () => {
    setShowCartBtn(true)
  }
 
  const handleMouseOut = () => {
    setShowCartBtn(false)
  }

  const handleClick = () => {
    navigate(`/${category}/${id}`)
  }

  const { data, loading, refetch} = useQuery(GET_PRODUCT_BY_ID, { variables: { productId: `${id}` }, fetchPolicy: "network-only" });

  const handleAddToCart = async () => {
    try {

      const {data:newData, loading:newLoading} = await refetch()

        const {attributes, prices, category} = !newLoading && newData.product
  
        const attributesData = !newLoading && attributes.reduce((acc, attribute) => {
          acc[attribute.name] = attribute.items[0];
          return acc;
        },{})
    
        const item = {
          selectedAttributes:attributesData,
          attributes:attributes,
          name:name,
          brand:brand,
          gallery:gallery,
          prices:prices,
          id: id,
          category: category,
          qty: 1,
        }
    
        dispatch(addToCart(item))
    } catch (error) {
      console.log(error)
    }

    await refetch()


  }

  return (
    <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className='card'>
        <div onClick={handleClick} className='img-container'>
          {!inStock && (<div className='out-of-stock-overlay'>OUT OF STOCK</div>)}
          <img src={gallery[0]} alt={name} />
        </div>
        {showCartBtn && inStock && (
          <div onClick={() => handleAddToCart()} className='card-cart-button'>
            <img src="./images/white-cart.png" alt="cart" />
              <div className="wheels">
                <img src="./images/white-wheel.png" alt="wheel" />
                <img src="./images/white-wheel.png" alt="wheel" />
              </div>
          </div>
        )}
        <div className='title-price-container'>
          <p onClick={handleClick} className='card-title'>{brand} {name}</p>
          <p className='card-price'>{prices[currency].currency.symbol}{prices[currency].amount}</p>
        </div>
    </div>
  )
}

export default ProductCard