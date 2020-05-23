import * as actionTypes from './actionTypes';
import axios from '../../../axios-orders';
export const add_ingrediant = (name) =>{
    return{
        type:actionTypes.ADD_INGREDIANT,
        ingredientName:name
    }
}
export const remove_ingrediant = (name) =>{
    return{
        type:actionTypes.REMOVE_INGREDIANT,
        ingredientName:name
    }
}
export const load_ingrediant = (ings) =>{
    console.log(ings);
    return{
        type:actionTypes.INIT_ING,
        ings:ings
    }
}
export const failed_loading_ing = () =>{
    return{
        type:actionTypes.FETCH_ING_ERR
    }
}
export const initIngrediant = () =>{
    return dispatch =>{
        axios.get('https://react-burger-builder-niket.firebaseio.com/ingredient.json')
        .then(resp => {
            console.log(resp);
            dispatch(load_ingrediant(resp.data))
        }).catch(resp => {
            console.log(resp.data);
            dispatch(failed_loading_ing())
        })
    }
}