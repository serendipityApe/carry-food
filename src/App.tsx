import './App.css';
import {appRouter} from './router'
import {Route,BrowserRouter,Switch} from 'react-router-dom'


import Header from './components/Header/Header'
function App() {
  return (
    <div className="App">
      <Header/>
      <BrowserRouter>   
      <Switch>
      {appRouter.map((r) => {
        return <Route key={r.path} exact={r.exact} path={r.path} render={routerProps => {return <r.component {...routerProps}/>}}/>
      })}
      </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
