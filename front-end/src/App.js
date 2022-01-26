import './App.css';
import SignUp from './pages/signUp';
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
          <Route path='/signup' exact element={<SignUp />}/>
        </Routes>
      </Router>
    </div>
  );
};

