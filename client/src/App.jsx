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
import { Create } from '@mui/icons-material';
import CreatePost from './features/CreatePost/CreatePost';
import ForumThread from './features/ForumThread/ForumThread';
import ForumThreadPage from './features/ForumThreadPage/ForumThreadPage';
import ForumThreadDeleted from './features/ForumThreadPage/ForumThreadDeleted';
import PostsByUser from './features/PostsByUser';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <UserOutlet /> }>
            <Route index path='/' element={ <Dashboard /> }/>
            <Route path='login' element={ <SignUp /> }/>
            <Route path='forum' element={ <Forum /> }/>
            <Route path='todo' element={ <Scheduler /> }/>
            <Route path='daily' element={ <StudyTimerSummary /> }/>
            <Route path='inbox' element={ <Notifications /> }/>
            <Route path='profile' element={ <Profile /> }/>
            <Route path='logout' element={ <SignOut /> }/>
            <Route path='*' element={ <NoPage /> }/>
            <Route path='createPost' element={ <CreatePost/> }/>
            <Route path='postThread' element={ <ForumThreadPage/>}>
              <Route path=":postId" element={<ForumThread/>}/>
              <Route path='deleted' element={ <ForumThreadDeleted/>}/>
            </Route>
            <Route path='posts/:userId' element={ <PostsByUser/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
