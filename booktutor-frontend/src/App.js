import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import ViewTeacher from './pages/viewteacher';
import Chat from './pages/chat';
// import LandingPage from './pages/landingPage';
import StudentDashboard from './pages/stdudentDashboard';
import TeacherDashboard from './pages/teacherDashboard';
import MainLandingPage from './pages/mainLandingPage';

function App() {
  return (
   <>
  
   <Router>

     {/* <Route exact path="/" component={Home} /> */}
     <Route exact path="/" component={MainLandingPage} />
     <Route exact path="/login" component={Login} />
     <Route exact path="/signup" component={SignUp} />
     <Route exact path="/teacher/:id" component={ViewTeacher} />
     <Route exact path="/chat" component={Chat} />
     <Route exact path="/studentDashboard" component={StudentDashboard} />
     <Route exact path="/teacherDashboard" component={TeacherDashboard} />

   </Router>
   </>
  );
}

export default App;
