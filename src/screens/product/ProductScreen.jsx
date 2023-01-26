import React from 'react'
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import GET_PRODUCT_BY_ID from "./productQueries"

const ProductScreen = () => {
  const params = useParams()

  const { data, loading, error } = useQuery(GET_PRODUCT_BY_ID, { variables: { productId: `${params.id}` } });

  !loading && console.log(data)

  return (
    <div>ProductScreen</div>
  )
}

export default ProductScreen