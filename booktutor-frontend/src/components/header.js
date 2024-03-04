import React , {useState , useEffect} from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import "../statics/css/header.css"
import { Boy, Chat, Notification } from '../utils/image';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Loader from './loader';

const Header = () => {

  const [user , setUser] = useState({});
  const location = useLocation();
  const [notifications , setNotifications] = useState([]);
  const [toggle , setToggle] = useState(false);

  useEffect(() => {
      // Access the passed data from location.state
      const passedData = location.state?.myData;
      console.log('Passed data:', passedData);
      setUser(passedData)
      // You can set this data to state or perform any necessary operations here
    }, [location.state]);

    console.log("user" , user)

    const teachertoken = localStorage.getItem("teachertoken");
    const studenttoken = localStorage.getItem("studenttoken");

    const studentLogout = () => {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/logout` , user).then
      ((res) => {
              toast.success("Logout Succesfully");
      }).catch((err) => {
          console.log(err)
      })
    }
    const teacherLogout = () => {
      axios.post(`${process.env.REACT_APP_BASE_URL}/api/teachers/logout` , user).then
      ((res) => {
              toast.success("Logout Succesfully");
      }).catch((err) => {
          console.log(err)
      })
    }
    const logout = () => {

      axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/logout` , user).then
      ((res) => {
              toast.success("Logout Succesfully");
      }).catch((err) => {
          console.log(err)
      })
      studentLogout();
      teacherLogout();
      setUser(null);
      localStorage.setItem("studenttoken" , "")
      localStorage.setItem("teachertoken" , "")
      localStorage.setItem("authuser" , null)
    }

    const getAllNotifications = async () => {
      console.log("iii" , user._id)
     await axios.get(`${process.env.REACT_APP_BASE_URL}/api/students/getNotifications/${user._id}`).then
      ((res) => {
        console.log("yyy" , res)
        setNotifications(res?.data)
      }).catch((err) => {
        console.log(err)
      })
    }

    useEffect(() => {
      if (user?._id) {
        getAllNotifications();
      }
    },[user?._id])

    //  Periodically fetch notifications (every 5 seconds in this example)
    // if you encounter server crashed then due to this condition server crashed removethis 
  useEffect(() => {
    const intervalId = setInterval(() => {
     if(user._id) getAllNotifications();
    }, 15000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

 

  return (
    <nav class="navbar navbar-expand-lg  main-header">
      <ToastContainer/>
  <div class="container-fluid">
    <a class="navbar-brand" href="#" className='logo'>
       Tutoring
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav ms-auto me-auto d-flex gap-4 mb-2 mb-lg-0">
       { studenttoken && <li class="nav-item">
          <a class="nav-link" aria-current="page" href="#">Find Tutor</a>
        </li>}
        <li class="nav-item">
          <a class="nav-link" href="#">About Us</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Contact Us</a>
        </li>
       { teachertoken && <li class="nav-item">
          <Link to="/bookingrequest" class="nav-link" href="#">Booking Requests</Link>
        </li>}
      </ul>
     { studenttoken || teachertoken ? 
     <div className="d-flex align-items-center gap-4" style={{position:"relative"}}>
      <div style={{position:"relative"}}>
      { !teachertoken && <div style={{position:"absolute" , left:"20px" , top:"-15px" , color:"red" , background:"#fff" , padding:"5px 10px" , fontSize:"12px", borderRadius:"50px"}}>{notifications?.length}</div>}
       <img src={Notification} alt="" onClick={() => setToggle(!toggle)} style={{cursor:"pointer"}} /> 
     { toggle && <div className='notification-div'>
      
      {notifications.map((item,index) => (
      <div key={index} className='p-2' style={{background:"#f5f1f1" , border:"1px solid #cdc4c4"}}>
        <p className='mb-0'>{item.message}</p>
        <div className="d-flex justify-content-between">
        <p className='mb-0'>From: {item.teachername}</p>
        <button style={{fontSize:"12px" , border:"none" , background:"#ffe69b" , borderRadius:"8px" , padding:"12px"}}>Proceed Payment</button>
        </div>
      </div>
      ))}
      
      </div>}
      </div>
      <Link to="/chat"> <img src={Chat} alt="" /> </Link>
      <div className="image">
        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="" style={{width:"60px" , height:"60px" , borderRadius:"50px"}} />
      </div>
      <div className="d-flex flex-column gap-1">
        <h5 className="mb-0 text-white">{user?.name}</h5>
        <p className="mb-0 mt-0 text-white">{user?.email}</p>
        
      </div>
      <button style={{background:"#ededed" , border:"none" , padding:"10px" , borderRadius:"8px"}} onClick={logout}>LOGOUT</button>
     </div>
     :<div class="d-flex gap-2">
      <Link to="/signup"><button style={{background:"#f3f3f3" , border:"none" , padding:"10px 20px"  , color:"#000",  borderRadius:"8px"}}>SIGN UP</button></Link>  
      <Link to="/login"><button style={{background:"#f3f3f3" , border:"none" , padding:"10px 20px"  , color:"#000",  borderRadius:"8px"}}>Log In</button></Link>
      </div>}
    </div>
  </div>
</nav>
  )
}

export default Header
