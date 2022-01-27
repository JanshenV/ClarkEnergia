import SignUp from './pages/signUp';
import Login from './pages/login';
import Home from './pages/home';
import { GlobalProvider } from './context/GlobalContext';
import {
    Route,
    Routes,
    BrowserRouter as Router
} from 'react-router-dom';;

export default function App() {
  return (
    <GlobalProvider>
      <Router>
        <Routes>
          <Route path='/signup' exact element={<SignUp />} />
          <Route path='/' exact element={<Login />} />
          <Route path='/home' exact element={<Home />} />
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

