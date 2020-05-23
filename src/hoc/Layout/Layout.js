import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../Navigation/Toolbar/Toolbar';
import SideDrawer from '../../Navigation/SideDrawer/SideDrawer';
class Layout extends Component{
    state={
        showSideDrawer:false
    }
    SideDrawerCloseHandler= () =>{
        this.setState({
            showSideDrawer:false
        })
    }
    SideDrawerOpenHandler= () =>{
        this.setState((prevState)=>{
            return {showSideDrawer:!this.state.showSideDrawer}
        })
    }
    render(){
        return(
            <Auxiliary>
                <SideDrawer clicked={this.SideDrawerCloseHandler}
                show={this.state.showSideDrawer} />
                <Toolbar toggle={this.SideDrawerOpenHandler}/>
                <main className = {classes.Content}>
                    {this.props.children}
                </main>
            </Auxiliary>
        )
    }
}
export default Layout;