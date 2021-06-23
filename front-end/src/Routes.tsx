import { BrowserRouter, Route } from 'react-router-dom';
import Home from './pages/Home';
import NewRoom from './pages/NewRoom';

function Routes() {
  
  return (
    <BrowserRouter>
      <Route path="/" exact component={Home} />
      <Route path="/sala/criar" component={NewRoom}/>
    </BrowserRouter>
  );
}

export default Routes;
