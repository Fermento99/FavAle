import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';
import MainPage from './main/MainPage'

function App() {
  // TODO: iniciate from serwer data
  let favourites = []
  window.sessionStorage.setItem('favourites', JSON.stringify(favourites)) 
  return (
    <Router>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
      <Route path='/main'>
        <MainPage />
      </Route>
    </Router>
  );
}

export default App;