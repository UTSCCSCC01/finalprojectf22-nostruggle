import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import UserOutlet from './components/navigation/NavBar/UserOutlet';
import Profile from './pages/Profile';
import StartPage from './pages/StartPage';
import NoPage from './pages/NoPage';
import SignOut from './features/SignUp/SignOut';
import Calculator from './features/Calculator/Calculator';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserOutlet /> }>
          <Route index element={ <StartPage /> }/>
          <Route path='profile' element={ <Profile /> }/>
          <Route path='logout' element={ <SignOut /> }/>
          <Route path='*' element={ <NoPage /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
