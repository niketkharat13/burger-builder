import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem'
const NavigationItems = (props) =>(
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">Burger Builder</NavigationItem>
        <NavigationItem link="/order">Order</NavigationItem>
        <NavigationItem link="/auth">Authentication</NavigationItem>
    </ul>
);
export default NavigationItems