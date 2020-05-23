import * as actionTypes from '../actions/actionTypes';
import {
    updateState
} from '../utility';
const initialSTate = {
    orders: [],
    loading: false,
    purchased: false
}
const purchased = (state, action) => {
    return updateState(state, {
        purchased: false
    })
}
const purchased_successfully = (state, action) => {
    const newOrder = {
        ...action.orderData,
        id: action.orderId
    }
    return updateState(state, {
        loading: false,
        orders: state.orders.concat(newOrder)
    })
}
const start_purchasing = (state, action) => {
    return updateState(state, {
        loading: true,
        purchased: true
    })
}
const purchase_failed = (state, action) => {
    return updateState(state, {
        loading: false
    })
}
const init_orders = (state, action) => {
    return updateState(state, {
        orders: action.order_payload
    })
}
const reducer = (state = initialSTate, action) => {
    switch (action.type) {
        case actionTypes.PURCHASED:
            return purchased(state, action)
        case actionTypes.PURCHASING_SUCCESS:
            return purchased_successfully(state, action)
        case actionTypes.PURCHASING_START:
            return start_purchasing(state, action)
        case actionTypes.PURCHASING_FAILED:
            return purchase_failed(state, action)
        case actionTypes.FETCH_ORDER_START:
            return init_orders(state, action)
        default:
            return state;
    }
}
export default reducer;