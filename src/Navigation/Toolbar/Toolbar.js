import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../components/Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import ToggleButton from '../ToggleButton/ToggleButton';
const Toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <ToggleButton togglebtnHandler={props.toggle} />
        <div className={classes.Logo}>
            <Logo />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
    </header>
);
export default Toolbar;