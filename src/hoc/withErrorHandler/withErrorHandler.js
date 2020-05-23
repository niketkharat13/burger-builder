import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary'
const withErrorHandler = (WrappedComponent , axios) =>{
    return class extends Component{
        state={
            error:null
        }
        componentDidMount(){
            this.reqInterceptors=axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            })
            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error:error
                })
            })
        }
        errorModalHandler = (props) =>{
            this.setState({
                error:null  
            })
        }
        componentWillUnmount(){
            console.log("WIll Unmount"+ this.reqInterceptors+ this.resInterceptors);
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }
        render(){
            return(
                <Auxiliary>
                    <Modal show={this.state.error}
                        clicked={this.errorModalHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props}/>
                </Auxiliary>
            )
        }
    }
}
export default withErrorHandler;