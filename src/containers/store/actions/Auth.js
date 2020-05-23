import * as actionTypes from './actionTypes';
import axios from 'axios';
export const auth_start = () => {
    return {
        type: actionTypes.AUTH_START
    }
}
export const auth_failed = () => {
    return {
        type: actionTypes.AUTH_FAILED
    }
}
export const authSuccess=(authData)=>{
    return{
        type:actionTypes.AUTH,
        authData:authData
    }
}
export const auth = (email, password, isSignIn) => {
    return dispatch => {
        dispatch(auth_start());
        const authData = {
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCpJJ7RHOcMBxbr4s78gTC8-_J9ZzB5awE';
        if (!isSignIn){
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCpJJ7RHOcMBxbr4s78gTC8-_J9ZzB5awE';
        }
        axios.post(url,authData).then(resp => {
            console.log(resp);
            dispatch(authSuccess(resp.data));
        }).catch(err =>{
            console.log(err);
            dispatch(auth_failed(err));
        });
    }
}