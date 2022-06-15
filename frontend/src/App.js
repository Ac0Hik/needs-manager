import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'


function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <PrivateRoute component={HomePage} path="/" exact />
          <Route component={LoginPage} path="/login" />
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
