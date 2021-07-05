import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import ThemeContextProvider from './context/ThemeContext';
import Home from './pages/Home/Home';
import NewRoom from './pages/NewRoom/NewRoom';
import Room from './pages/Room/Room';
import AdminRoom from './pages/AdminRoom/AdminRoom';

function Routes() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/sala/criar" component={NewRoom} />
            <Route path="/sala/criar" exact component={NewRoom} />
            <Route path="/sala/:id" component={Room} />
            <Route path="/asala/:id" component={AdminRoom} />
            <Route component={() => <h1>Talk_Ask</h1>} />
          </Switch>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;