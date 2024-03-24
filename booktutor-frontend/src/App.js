import logo from './logo.svg';
import './App.css';
import { Header } from './components';
import Home from './pages/home';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import ViewTeacher from './pages/viewteacher';
import { io } from 'socket.io-client';
import Chat from './pages/chat';
import BookingRequest from './pages/bookingrequest';
import Aboutus from './pages/aboutus';
import LandingPage from './pages/landingPage';
import StudentDashboard from './pages/stdudentDashboard';
import TeacherDashboard from './pages/teacherDashboard';

const socket = io.connect("http://localhost:9000")

function App() {
  return (
   <>
  
   <Router>
   
     {/* <Route exact path="/" component={Home} /> */}
     <Route exact path="/" component={LandingPage} />
     <Route exact path="/login" component={Login} />
     <Route exact path="/signup" component={SignUp} />
     <Route exact path="/teacher/:id" component={ViewTeacher} />
     <Route exact path="/chat" component={Chat} />
     <Route exact path="/bookingrequest" component={BookingRequest} />
     <Route exact path="/aboutus" component={Aboutus} />
     <Route exact path="/studentDashboard" component={StudentDashboard} />
     <Route exact path="/teacherDashboard" component={TeacherDashboard} />
     </Router>
   </>
  );
}

export default App;
