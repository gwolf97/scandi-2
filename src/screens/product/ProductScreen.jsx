import React, {useState, useEffect} from 'react'
import "./product.css"
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import GET_PRODUCT_BY_ID from "./productQueries"
import { ImgGallery } from '../../components'

const ProductScreen = () => {
  const params = useParams()

  const [selectedImg, setSelectedImg] = useState("")
  const [gallery, setGallery] = useState([])

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { productId: `${params.id}` } });

  useEffect(() => {
    !loading && setSelectedImg(data.product.gallery[0])
    !loading && setGallery(data.product.gallery)
  },[loading])

  return (
    <section>
      <div className='grid-container'>
        <div className='img-gallery'>
          <ImgGallery setSelectedImg={setSelectedImg} gallery={gallery}/>
        </div>
        <div className='lg-gallery-img'>
          <img src={selectedImg} alt="product image" />
        </div>
        <div className='controls-description'>
          contorols-description
        </div>
      </div>
    </section>
  )
}

export default ProductScreen