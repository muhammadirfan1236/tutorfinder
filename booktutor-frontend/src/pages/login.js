// import axios from 'axios';
// import React , {useState} from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import { useHistory } from 'react-router-dom';
// import BackgroundBg from "../statics/images/authbg.jpg"
// import Logo from "../statics/images/mainlogo.png"
// import { MdOutlineEmail } from "react-icons/md";
// import { CiLock } from "react-icons/ci";
// import "../statics/css/login.css"
// import { Link } from 'react-router-dom/cjs/react-router-dom.min';
// import ImageOne from "../statics/images/imageone.jpg"

// const Login = () => {
//     const history = useHistory();
//     const [tab , setTab] = useState("STUDENT");

//     const initialValues = {
//         email: "",
//         password: "",
//     }

//     const [formValues , setFormValues] = useState(initialValues);

//     const handleChange = (e) => {
//         const { name , value } = e.target;
//         setFormValues({...formValues , [name] : value})
//     }


//     const loginStudent = () => {
//         axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/login` , formValues).then
//         ((res) => {
//                 console.log("res" , res);
//                 toast.success("Login Succesfully");
//                 localStorage.setItem("studenttoken" , res?.data?.tokens?.access_token);
//                 localStorage.setItem("authuser" , res?.data?.userData?._id);
//                 localStorage.setItem("authstudent" , res?.data?.userData?._id);
//                 setTimeout(() => {
//                     history.push("/" , { myData: res?.data?.userData }) 
//                 }, 3000);
//         }).catch((err) => {
//             console.log(err)
//             toast.error(err.response?.data?.message)
//         })
//     }

//     const loginTeacher = () => {
//         axios.post(`${process.env.REACT_APP_BASE_URL}/api/teachers/login` , formValues).then
//         ((res) => {
//                 console.log("res" , res);
//                 toast.success("Login Successfully");
//                 localStorage.setItem("teachertoken" , res?.data?.tokens?.access_token);
//                 localStorage.setItem("authuser" , res?.data?.userData?._id);
//                 localStorage.setItem("authteacher" , res?.data?.userData?._id);
//                 setTimeout(() => {
//                     history.push("/", { myData: res?.data?.userData }) 
//                 }, 3000);
                
//         }).catch((err) => {
//             debugger
//             console.log(err);
//             toast.error(err.response?.data?.message)
//         })
//     }

//     const handleSubmit = () => {
//         if(tab === "STUDENT") loginStudent();
//         else loginTeacher();
//     }


//   return (
//     <>
//        <ToastContainer/>
//        <div className='overflow-hidden login-form' >
     
//      <div className="row" style={{height:"100vh"}}>
      
//        <div className="col-lg-6 col-sm-12 px-0 px-5 py-3 d-flex flex-column gap-3 justify-content-center" style={{height:"100vh" , overflow:"auto" , background:"#000000"}} >
          
//           <div className="d-flex justify-content-center">
//           <div className="w-75 p-5" style={{background:"rgb(9 9 9)" , border:"1px solid #282626"}}>
//          <div className="d-flex justify-content-center">
//          <img src={Logo} alt="" className='w-50' />
//            </div>
//           <div className="d-flex gap-1 justify-content-center mt-3">
         
//                <h5 style={{ color: tab === "STUDENT" ? "#FFC632" : "#fff" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("STUDENT")}>Student</h5>
//                <h5 style={{ color: tab === "TEACHER" ? "#FFC632" : "#fff" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("TEACHER")}>Teacher</h5>
//            </div>
//            {/* <h4 className='text-center mb-0' style={{color:"#AFB6C2" , fontWeight:"bold"}}>LOGIN AS {tab}</h4> */}
//            <div className="d-flex flex-column gap-1 text-white">
//                <label htmlFor="" className='fs-4'>Email <span style={{color:"red"}}>*</span></label>
//                <div className='input-div'>
//                    <MdOutlineEmail className='fs-4'/>
//                    <input name='email' className='fs-4' onChange={handleChange} type="text"  placeholder='Enter Email' />
//                </div>
              
//            </div>
//            <div className="d-flex flex-column gap-1 text-white mt-3">
//               <label htmlFor="" className='fs-4'>Password <span style={{color:"red"}}>*</span> </label>
//               <div className='input-div'>
//                    <CiLock className='fs-4'/>
//                <input name='password' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Password' />
//                </div>
//            </div>
//            <div className="loginbtn">
//                <button className=' w-100 mt-3' onClick={handleSubmit}>Login</button>
//            </div>
//            <div className="text-center">
//                <p className="mb-0 mt-1 text-white">If you dont have an account please <Link style={{textDecoration:"none"}} to="/signup">  <span style={{fontSize:"18px" , color:"yellow" , cursor:"pointer"}}>Register Now</span></Link></p>
//            </div>
//           </div>
//           </div>
        
         
//            {/* <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div>
//            <div className="d-flex flex-column gap-1">
//                <h5>Name</h5>
//                <input type="text" className='form-control' />
//            </div> */}
//        </div>
//        <div className="col-lg-6 col-sm-12 h-100 px-0" >
//            <div className="image" style={{height:"100%" , width:"100%"}}>
//                <img src={ImageOne} alt="" className='w-100'  style={{height:"100%" , width:"100%"}} />
//            </div>
//        </div>
//      </div>
//    </div>
//     </>
   
//   )
// }

// export default Login















import React, { useState } from 'react'
import axios from "axios"
import { ToastContainer , toast } from "react-toastify"
import  "../statics/css/styles.css"
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const Login = () => {
 const history = useHistory();
  const initialValues = {
            email: "",
            password: "",
        }
    
        const [formValues , setFormValues] = useState(initialValues);
    
        const handleChange = (e) => {
            const { name , value } = e.target;
            setFormValues({...formValues , [name] : value})
        }

      const loginStudent = (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/login` , formValues).then
        ((res) => {
                console.log("res" , res);
                toast.success("Login Succesfully");
                // localStorage.setItem("token" , res?.data?.tokens?.access_token);
                localStorage.setItem("user" , JSON.stringify(res?.data?.userData));
                if(res?.data?.userData?.role === "1") {
                  localStorage.setItem("studenttoken" , res?.data?.tokens?.access_token);
                  localStorage.setItem("authuser" , res?.data?.userData?._id);
                  setTimeout(() => {
                    history.push("/studentDashboard" , { myData: res?.data?.userData }) 
                }, 2000);
                
                }
                else {
                  localStorage.setItem("teachertoken" , res?.data?.tokens?.access_token);
                  localStorage.setItem("authuser" , res?.data?.userData?._id);
                  setTimeout(() => {
                    history.push("/teacherDashboard" , { myData: res?.data?.userData }) 
                }, 2000);
                }
               
        }).catch((err) => {
            console.log(err)
            toast.error(err.response?.data?.message)
        })
    }

  return (
    <>
    <ToastContainer/>
    <div className="d-flex justify-content-center align-items-center" style={{height:"100vh" , background:"rgb(130, 106, 251)"}}>
   <section class="container-box">
      <header className='fs-1 text-center'>Login</header>
      <form action="#" class="form" onSubmit={loginStudent}>
        <div class="input-box">
          <label className='fs-4 fw-normal'>Email</label>
          <input type="email" name='email' value={formValues?.email} onChange={handleChange} className='fs-4' placeholder="Enter Your Email" required />
        </div>

        <div class="input-box">
          <label>Password</label>
          <input type="password" name='password' value={formValues?.password} onChange={handleChange} className='fs-4' placeholder="Enter Password" required />
        </div>

        <button className='fs-4' type='submit'>Login</button>
      </form>
      <span class="psw fs-4">Don't Have an account <a href="/signup">Create</a></span>
    </section>
    </div>
    </>
  
 
  )
}

export default Login
