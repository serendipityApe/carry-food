import './App.css';
import { appRouter, mainRouter } from './router'
import { Route, BrowserRouter, Switch } from 'react-router-dom'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          {appRouter.map((r) => {
            return <Route key={r.path} exact={r.exact} path={r.path} render={routerProps => { console.log(routerProps); return <r.component routers={r.routers} {...routerProps} /> }} />
          })}
          {mainRouter.map((r) => {
            return <Route key={r.path} exact={r.exact} path={r.path} render={routerProps => { console.log(routerProps); return <r.component routers={r.routers} {...routerProps} /> }} />
          })}
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
