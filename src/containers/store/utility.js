export const updateState = (oldObj, updatedObj) => {
    return{
        ...oldObj,
        ...updatedObj
    }
}