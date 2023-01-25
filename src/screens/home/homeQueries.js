import {gql} from '@apollo/client'

const GET_PRODUCTS = gql`
query{
  categories{
    products{
      id
      name
      inStock
      gallery
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
}
`


export default GET_PRODUCTS