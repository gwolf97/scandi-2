import { changeCurrency } from '../../actions/cartActions'
import {useDispatch} from "react-redux"
import "./currencySelector.css"

export const CurrencySelector = () => {
    const dispatch = useDispatch()
    
        return (
            <div className='currency-selector-container'>
                <div onClick={() => dispatch(changeCurrency(0))} className='currency'>$ USD</div>
                <div onClick={() => dispatch(changeCurrency(1))} className='currency'>£ GBP</div>
                <div onClick={() => dispatch(changeCurrency(2))} className='currency'>A$ AUD</div>
                <div onClick={() => dispatch(changeCurrency(4))} className='currency'>₽ RUB</div>
                <div onClick={() => dispatch(changeCurrency(3))} className='currency'>¥ JPY</div>
            </div>
        )
    }