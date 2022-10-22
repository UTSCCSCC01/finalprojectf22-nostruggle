import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';

import Profile from './pages/Profile';
import StartPage from './pages/StartPage';
import NoPage from './pages/NoPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Outlet /> }>
          <Route index element={ <StartPage /> }/>
          <Route path='profile' element={ <Profile /> }/>
          <Route path='*' element={ <NoPage /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
