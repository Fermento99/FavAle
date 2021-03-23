import { BrowserRouter as Router, Route } from 'react-router-dom'
import LoginPage from './login/LoginPage';
import RegisterPage from './login/RegisterPage';

function App() {
  return (
    <Router>
      <Route exact path="/">
        <LoginPage />
      </Route>
      <Route path='/register'>
        <RegisterPage />
      </Route>
    </Router>
  );
}

export default App;