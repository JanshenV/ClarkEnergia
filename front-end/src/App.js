import './App.css';
import SignUp from './pages/signUp';
import Login from './pages/login';
import Home from './pages/home';


import {
    Route,
    Routes,
    BrowserRouter as Router
} from 'react-router-dom';

export default function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/' exact element={<Login />} />   
          <Route path='/home' exact element={<Home />} />   
        </Routes>
      </Router>
    </div>
  );
};

