import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Order from '../../components/Order/Order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
class Orders extends Component {
    componentDidMount(){
        this.props.onInitOrders();
        console.log(this.props.orders);
    }
    render(){
        return(
            <div>
                {this.props.orders.map(order =>(
                        <Order 
                            key={order.id}
                            ings={order.ingredients}
                            price={order.price} />
                    ))
                }
            </div>
        );
    }
}
const mapsPropsToState = state =>{
    return{
        orders: state.order_Reducer.orders,
        price: state.Burger_Reducer.basePrice
    }
}
const mapsDispatchToState = dispatch=> {
    return{
        onInitOrders:()=>dispatch(actions.fetching_orders())
    }
}
export default connect(mapsPropsToState, mapsDispatchToState)(withErrorHandler(Orders,axios));