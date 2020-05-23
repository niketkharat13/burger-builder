import React from 'react';
import classes from './SideDrawer.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../components/Logo/Logo';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../../components/UI/Backdrop/Backdrop'
const SideDrawer = (props) =>{
    let attachedclasses = [classes.SideDrawer, classes.Close];
    if(props.show){
        attachedclasses = [classes.SideDrawer, classes.Open]
    }
    return(
        <Auxiliary>
            <BackDrop show={props.show} cancel={props.clicked}/>
            <div className={attachedclasses.join(' ')}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </Auxiliary>
    );
}
export default SideDrawer;