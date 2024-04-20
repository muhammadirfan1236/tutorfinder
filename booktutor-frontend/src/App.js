import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './pages/login';
import SignUp from './pages/signup';
import ViewTeacher from './pages/viewteacher';
import Chat from './pages/chat';
// import LandingPage from './pages/landingPage';
import StudentDashboard from './pages/stdudentDashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import TeacherDashboard from './pages/teacherDashboard';
import MainLandingPage from './pages/mainLandingPage';
import AdminDashboard from './pages/adminDashboard';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';

function App() {
  const [show , setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
   <>

   <Router>
 
     <Route exact path="/" component={MainLandingPage} />
     <Route exact path="/login" component={Login} />
     <Route exact path="/signup" component={SignUp} />
     <Route exact path="/teacher/:id" component={ViewTeacher} />
     <Route exact path="/chat" component={Chat} />
     <Route exact path="/studentDashboard" component={StudentDashboard} />
     <Route exact path="/teacherDashboard" component={TeacherDashboard} />
     <Route exact path="/adminDashboard" component={AdminDashboard} />

   </Router>
   </>
  );
}

export default App;
