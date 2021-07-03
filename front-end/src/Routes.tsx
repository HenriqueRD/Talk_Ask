import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';
import Room from './pages/Room';
import AdminRoom from './pages/AdminRoom';

function Routes() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/sala/criar" component={NewRoom} />
          <Route path="/sala/criar" exact component={NewRoom} />
          <Route path="/sala/:id" component={Room} />
          <Route path="/asala/:id" component={AdminRoom} />
          <Route component={() => <h1>Talk_Ask</h1>} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;