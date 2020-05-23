import * as actionTypes from '../actions/actionTypes';
import {
    updateState
} from '../utility';
const initialState = {
    ingredient: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    basePrice: 4,
    error: false
}
const ingredientPice = {
    salad: 0.4,
    bacon: 0.7,
    meat: 1.3,
    cheese: 0.6
}
const addIng = (state, action) => {
    const updatedIng = {
        [action.ingredientName]: state.ingredient[action.ingredientName] + 1
    }
    const updateIngs = updateState(state.ingredient, updatedIng);
    const newState = {
        ingredient: updateIngs,
        basePrice: state.basePrice + ingredientPice[action.ingredientName]
    }
    return updateState(state, newState)
}
const removeIng = (state, action) => {
    const removeIng = {
        [action.ingredientName]: state.ingredient[action.ingredientName] - 1
    }
    const removeIngs = updateState(state.ingredient, removeIng);
    const updatedState = {
        ingredient: removeIngs,
        basePrice: state.basePrice - ingredientPice[action.ingredientName]
    }
    return updateState(state, updatedState);
}
const initIng = (state,action)=>{
    const initState = {
        ingredient: action.ings,
        basePrice: 4,
    }
    return updateState(state, initState);
}
const fetchError =(state,action)=>{
    return updateState(state, {
        error: true
    })
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIANT:
            return addIng(state, action);
        case actionTypes.REMOVE_INGREDIANT:
            return removeIng(state,action);
        case actionTypes.INIT_ING:
            return initIng(state,action);
        case actionTypes.FETCH_ING_ERR:
            return  fetchError(state,action)
        default:
            return state;
    }
}
export default reducer;