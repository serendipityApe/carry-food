import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Switch,Route,Redirect} from 'react-router-dom'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {store,persistor} from './redux/store'
import {Provider} from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

import {mainRouter} from './router'
ReactDOM.render(
    <BrowserRouter>
      <Switch>
        <Route path="/" render={(renderProps:any) => 
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <App {...renderProps}/> 
          </PersistGate>
        </Provider>}/>

        {/* {mainRouter.map((route) => {
          return <Route key={route.path} exact={route.exact} path={route.path} render={(renderProps) => {return <Provider store={store}><route.component {...renderProps}/></Provider>}}/>
        })} */}
        <Redirect to="/404" />
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
