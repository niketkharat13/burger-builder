import React, { Component } from 'react';
import ContactData from './ContactData/ContactData';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
class Checkout extends Component{
    cancelHandler = () =>{
        this.props.history.goBack();
    }
    continueHandler = () =>{
        this.props.history.push('/checkout/contact-form');
    }
    render(){
        let summary = <Redirect to="/"/>
        if (this.props.ings) {
            const order_submit = this.props.purchased ? <Redirect to="/"/> : null; 
            summary = (
                <div>
                {order_submit}
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    oncontinue={this.continueHandler}
                    oncancel={this.cancelHandler}/>
                <Route path={this.props.match.path + '/contact-form'} 
                    component={ContactData}/>
            </div>
            )
        }
        return summary
    }
}
const mapStateToProps = state =>{
    return{
        ings: state.Burger_Reducer.ingredient,
        purchased:state.order_Reducer.purchased
    }
}
export default connect(mapStateToProps)(Checkout);