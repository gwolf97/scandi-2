import {gql} from '@apollo/client'

const GET_PRODUCT_BY_ID = gql`
query($productId:String!){
    product(id:$productId) {
      id
      name
      inStock
      gallery
      description
      category
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
  }
}
  `

export default GET_PRODUCT_BY_ID