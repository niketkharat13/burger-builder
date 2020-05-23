import React, { Component } from 'react';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    componentDidUpdate(){
        console.log("[OrderSummary] Update");
    }
    render(){
        const ingrediantSummary = Object.keys(this.props.ingrediants).map(igKey =>{
            return <li key ={igKey}>{igKey} : {this.props.ingrediants[igKey]}</li>
        })
        return (
            <Auxiliary>
                <h3>Your Order</h3>
                <p>A delicious burger with following ingrediants</p>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <ul>
                    {ingrediantSummary}
                </ul>
                <Button btnType="Danger" clicked={this.props.cancel}>Cancel</Button>
                <Button btnType="Success" clicked={this.props.continue}>Continue</Button>
            </Auxiliary>
        );
    }
}
export default OrderSummary;