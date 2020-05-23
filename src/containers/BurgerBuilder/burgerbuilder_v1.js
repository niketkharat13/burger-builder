import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Modal/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
const ingredientPice={
    salad:0.4,
    bacon:0.7,
    meat:1.3,
    cheese:0.6
}
class BurgerBuilder extends Component{
    state = {
        ingredient: null,
        basePrice:4,
        purchasabe:false,
        purchasing:false,
        loading:false,
        error:false
    }
    componentDidMount(){
        
    }
    updatePurchasable(ingrediants) {
        const sum = Object.keys(ingrediants).map(igKey=>{
            return ingrediants[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        }, 0);
        this.setState({
            purchasabe: sum > 0
        });
    }
    addIngrediant=(type)=>{
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount + 1;
        const updatedIngrediant = {
            ...this.state.ingredient
        };
        updatedIngrediant[type]=updatedCount;
        const priceAddition = ingredientPice[type];
        const oldPrice = this.state.basePrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            basePrice:newPrice,
            ingredient:updatedIngrediant
        });
        this.updatePurchasable(updatedIngrediant);
    }
    removeIngrediant = (type) => {
        const oldCount = this.state.ingredient[type];
        const updatedCount = oldCount - 1;
        const updatedIngrediant = {
            ...this.state.ingredient
        };
        updatedIngrediant[type] = updatedCount;
        const priceDeduction = ingredientPice[type];
        const oldPrice = this.state.basePrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            basePrice: newPrice,
            ingredient: updatedIngrediant
        });
        this.updatePurchasable(updatedIngrediant);
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
        this.setState({
            loading:true
        })
        const order={
            ingrediants:this.state.ingredient,
            price:this.state.basePrice,
            customer:{
                name:"Niket Kharat",
                address:{
                    building:"Test Building 1",
                    street:"Test Street",
                    zipCode:"400022"
                },
                delieveryMode:'Fastest',
                paymentMode:"COD",
                email:'niketkharat13@gmail.com'
            }
        }
        axios.post('/orders.josn', order).then(resp=>{
            this.setState({
                loading: false,
                purchasing:false
            })
            console.log(resp);
        }).catch(err=>{
            console.log(err);
        });
    }
    render(){
        let burger = <Spinner/>
        if(this.state.ingredient){
            burger= (
                <Auxiliary>
                    <Burger ingredients={this.state.ingredient}/>
                    <BurgerControls 
                        addIngrediant={this.addIngrediant}
                        removeIngrediant={this.removeIngrediant}
                        isDisable={disableInfo}
                        price={this.state.basePrice}
                        purchasable={this.state.purchasabe}
                        purchase={this.purchaseHandler} />
                </Auxiliary>)
                orderSummary = <OrderSummary 
                        ingrediants={this.state.ingredient}
                        cancel={this.cancelPurchasingHandler}
                        continue={this.purchaseContinue}
                        price={this.state.basePrice} />
                        if(this.state.loading){
                            orderSummary = <Spinner/>
                        }
        }
        let orderSummary = null;
        if(this.state.error){
            burger = <p>Ingrediants cant be loaded</p>
        }
        const disableInfo = {
            ...this.state.ingredient
        }
        for (let key in disableInfo){
            disableInfo[key]= disableInfo[key] <= 0;
        }
        return(
            <Auxiliary>
                <Modal show={this.state.purchasing} clicked={this.cancelPurchasingHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>
        )
    }
}
export default withErrorHandler(BurgerBuilder, axios);