import React from 'react';
import classes from './Backdrop.module.css';
const Backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.cancel}></div> :null
);
export default Backdrop;