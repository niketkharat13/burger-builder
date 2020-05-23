import React, {Component} from 'react';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerBuilderActions from '../store/actions/index';
class BurgerBuilder extends Component{
    state = {
        purchasing:false,
    }
    updatePurchasable(ingrediants) {
        const sum = Object.keys(ingrediants).map(igKey=>{
            return ingrediants[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        }, 0);
        return sum > 0
    }
    componentDidMount(){
        this.props.initIng();
       
        }
    cancelPurchasingHandler = () =>{
        this.setState({
            purchasing:false
        })
    }
    purchaseHandler = () =>{
        this.setState({
            purchasing:true
        })
    }
    
    purchaseContinue = () =>{
        this.props.history.push("/checkout");
        this.props.onPurchased();
    }
    render(){
        let orderSummary = <OrderSummary 
                        ingrediants={this.props.ings}
                        cancel={this.cancelPurchasingHandler}
                        continue={this.purchaseContinue}
                        price={this.props.price} />
        if(this.props.loading){
            orderSummary = <Spinner/>
        }
        const disableInfo = {
            ...this.props.ings
        }
        for (let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.props.ings}/>
                <BurgerControls 
                    addIngrediant={this.props.onAddIngrediant}
                    removeIngrediant = {
                        this.props.onRemoveIngrediant
                    }
                    isDisable={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchasable(this.props.ings)}
                    purchase={this.purchaseHandler} />
            </Auxiliary>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings: state.Burger_Reducer.ingredient,
        price: state.Burger_Reducer.basePrice,
        error: state.Burger_Reducer.error,
        purchased: state.order_Reducer.purchased
    }
}
const mapDispatchToProps = dispatch => {
    return{
        onAddIngrediant: (ingName) => dispatch(burgerBuilderActions.add_ingrediant(ingName)),
        onRemoveIngrediant:(ingName)=>dispatch(burgerBuilderActions.remove_ingrediant(ingName)),
        initIng:() =>dispatch(burgerBuilderActions.initIngrediant()),
        onPurchased:() => dispatch(burgerBuilderActions.purchased())
    }
}   

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));