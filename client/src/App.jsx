import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import './App.css';
import UserOutlet from './components/navigation/NavBar/UserOutlet';
import Profile from './pages/Profile';
import Dashboard from './pages/Dashboard';
import NoPage from './pages/NoPage';
import SignOut from './features/SignUp/SignOut';
import Scheduler from './features/Todo/Scheduler';
import Forum from './features/Forum/Forum';
import StudyTimerSummary from './features/Todo/StudyTimer/Summary/StudyTimerSummary';
import SignUp from './features/SignUp/SignUp';
import Notifications from './features/Notifications';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserOutlet /> }>
            <Route path='/home' element={ <Dashboard /> }/>
            <Route index path='login' element={ <SignUp /> }/>
            <Route path='forum' element={ <Forum /> }/>
            <Route path='todo' element={ <Scheduler /> }/>
            <Route path='daily' element={ <StudyTimerSummary /> }/>
            <Route path='notifications' element={ <Notifications /> }/>
            <Route path='profile' element={ <Profile /> }/>
            <Route path='logout' element={ <SignOut /> }/>
            <Route path='*' element={ <NoPage /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
