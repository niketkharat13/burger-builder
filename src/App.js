import React from 'react';
import './App.css';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout'
import Layout from './hoc/Layout/Layout';
import Orders from './containers/Orders/Order';
import Auth from './containers/Auth/Auth';
import { Route, Switch } from 'react-router-dom';
function App() {
  return (
    <Layout>
        <Switch>
            <Route path="/order" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/auth" component={Auth} />
            <Route path="/" component={BurgerBuilder} exact/>
        </Switch>
    </Layout>
  );
}

export default App;
