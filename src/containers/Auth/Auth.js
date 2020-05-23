import React, {
    Component
} from 'react';
import classes from './Auth.module.css';
import {
    connect
} from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../store/actions/index';
class Auth extends Component {
    state = {
        authForm: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 25
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 8,
                    maxLength: 20
                },
                valid: false,
                touched: false
            },
        },
        isSignIn : false 
    }
    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }
    switchPage = () =>{
        this.setState(prevState=>{
            return{
                isSignIn:!prevState.isSignIn
            }
        });
    }
    inputHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.authForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let k in updatedForm) {
            formIsValid = updatedForm[k].valid && formIsValid;
        }
        this.setState({
            authForm: updatedForm,
            formValid: formIsValid
        });
    }
    submitHandler = (event) => {
        event.preventDefault();
        const authForm = {
            email:this.state.authForm.email.value,
            password:this.state.authForm.password.value
        } 
        this.props.onSubmit(authForm.email,authForm.password, this.state.isSignIn);
    }
    render() {
        const formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                config: this.state.authForm[key]
            })
        }
        
        let form =(
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
        return ( 
            <div className={classes.Auth}>
                {form}
                <Button btnType="Danger" clicked={this.switchPage}>Switch To {this.state.isSignIn ?'SIGN UP':'SIGN IN'}</Button>
            </div>
        )
    }
}
const mapDispatchToProps = dispatch =>{
    return{
        onSubmit: (email, password, isSignIn) => dispatch(actions.auth(email, password, isSignIn))
    }
}
export default connect(null, mapDispatchToProps)(Auth);