import React, { Component } from 'react';
import classes from './ContactData.module.css';
import { connect } from 'react-redux';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Modal/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import * as actionCreaters from '../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
class ContactData extends Component{
    state = {
        orderForm:{
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:10
                },
                valid: false,
                touched:false
            },
            address: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched:false
            },
            delieveryMode: {
                elementType: 'select',
                elementConfig: {
                        options: [{
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }, {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        }]
                    },
                value: '',
                valid:true,
                validation: {},
                touched:false
            },
            email: {
                elementType: 'input',
                
                elementConfig: {
                        type: 'text',
                        placeholder: 'Your E-Mail'
                    },
                value: '',
                valid:false,
                validation: {
                    required: true
                },
                touched:false
            }
        },
        formValid:false,
        price:0
    }
    checkValidity (value ,rules) {
        let isValid=true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    submitHandler = (event) =>{
        event.preventDefault();
         this.setState({
             loading: true
         });
         const customer_details = {};
         for(let i in this.state.orderForm){
             customer_details[i]=this.state.orderForm[i].value;
         }
         const newObj ={
             customer_details,
             ingredients:this.props.ings,
             price:this.props.price
         }
         console.log(newObj);
        this.props.orderSubmit(newObj);
        this.props.history.push("/");
    }
    inputHandler = (event, inputIdentifier) =>{
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched=true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        console.log(updatedFormElement);
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid= true;
        for (let k in updatedForm){
            formIsValid = updatedForm[k].valid && formIsValid;
        }
        console.log(formIsValid);
        this.setState({
            orderForm:updatedForm,
            formValid: formIsValid
        });
        console.log(this.state.orderForm);
        
    }
    render(){
        const formElementArray = [];
        for(let key in this.state.orderForm){
            formElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = <Spinner/>
        if(!this.props.loading){
            form =(
                <form onSubmit={this.submitHandler}>
                    {
                        formElementArray.map(ele =>(
                            <Input key={ele.id}
                                elementType={ele.config.elementType}
                                elementConfig={ele.config.elementConfig}
                                value={ele.config.elementConfig.value}
                                valid={!ele.config.valid}
                                validation={ele.config.validation}
                                touched={ele.config.touched}
                                changed={(event)=>this.inputHandler(event,ele.id)}
                                />
                        ))
                    }
                    <Button btnType="Success" disabled={!this.state.formValid}>Submit</Button>
                </form>
            )
        }
        return(
            <div className={classes.ContactData}>
                <h4>Please Fill the Form</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return{
        ings: state.Burger_Reducer.ingredient,
        price: state.Burger_Reducer.basePrice,
        loading: state.order_Reducer.loading,
        purchased:state.order_Reducer.purchased
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        orderSubmit:(orderData)=>dispatch(actionCreaters.purchase_start(orderData))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));