import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';
export const purchase_succ = (id, orderData) => {
    return {
        type: actionTypes.PURCHASING_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}
export const purchasie_fail = (error) => {
    return {
        type: actionTypes.PURCHASING_FAILED,
        error: error
    }
}
export const purchase_request = () => {
    return {
        type: actionTypes.PURCHASING_START
    }
}
export const purchase_start = (orderData) => {
    return dispatch => {
        dispatch(purchase_request());
        axios.post('https://react-burger-builder-niket.firebaseio.com/orders.json', orderData).then(resp => {
            console.log(resp);
            dispatch(purchase_succ(resp.data.name, orderData))
        }).catch(err => {
            dispatch(purchasie_fail(err))
        });
    }
}

export const purchased = () => {
    return {
        type: actionTypes.PURCHASED
    }
}
export const fetching_order_start = (data) => {
    return {
        type: actionTypes.FETCH_ORDER_START,
        order_payload: data
    }
}
export const fetching_order_failed = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: err
    }
}
export const fetching_orders = () => {
    return dispatch => {
        axios.get('/orders.json').then(resp => {
            const fetchOrders = [];
            for (let i in resp.data) {
                fetchOrders.push({
                    id: i,
                    ...resp.data[i]          
                })
                console.log(resp);
            }
            dispatch(fetching_order_start(fetchOrders)) 
        }).catch(err => {
            dispatch(fetching_order_failed(err))
        })
    }
}