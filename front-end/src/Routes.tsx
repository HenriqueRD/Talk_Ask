import { BrowserRouter, Route } from 'react-router-dom';
import AuthContextProvider from './context/AuthContext';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

function Routes() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/sala/criar" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default Routes;