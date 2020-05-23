import React from 'react';
import classes from './ToggleButton.module.css'
const ToggleButton = (props) =>{
    return(
        <div className={classes.DrawerToggle} onClick={props.togglebtnHandler}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}
export default ToggleButton;