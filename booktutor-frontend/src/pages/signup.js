import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import BackgroundBg from "../statics/images/authbg.jpg"
import { MdOutlineEmail } from 'react-icons/md';
import { CiLock } from 'react-icons/ci';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Logo from "../statics/images/mainlogo.png"
import { IoMdArrowBack } from "react-icons/io";

import "../statics/css/login.css"

const SignUp = () => {
    const [tab, setTab] = useState("STUDENT");
    const history = useHistory();
    const initialValues = {
        name: "",
        subject: "",
        price: "",
        education: "",
        location: "",
        image: null,
        age: "",
        gender: "",
        description: "",
        email: "",
        password: "",
    }

    const [formValues, setFormValues] = useState(initialValues);
    const [step, setStep] = useState(1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value })
    }

    const handleImageChange = (e) => {
        debugger
        const file = e.target.files[0];
        setFormValues({...formValues, image: file})
    }

    console.log("image" , formValues.image)

    const signupStudent = () => {
        const mainData = new FormData();
        mainData.append("name" , formValues?.name ? formValues?.name : "")
        mainData.append("email" , formValues?.email ? formValues?.email : "")
        mainData.append("password" , formValues?.password ? formValues?.password : "")
        mainData.append("subject" , formValues?.subject ? formValues?.subject : "")
        mainData.append("age" , formValues?.age ? formValues?.age : "")
        mainData.append("gender" , formValues?.gender ? formValues?.gender : "")
        mainData.append("image" , formValues?.image ? formValues?.image : null)

        axios.post("http://localhost:9000/api/students/create", mainData).then
            ((res) => {
                console.log("res", res);
                toast.success(res.data?.message);
                setTimeout(() => {
                    history.push("/login")
                }, 1000);
            }).catch((err) => {
                console.log(err)
                console.log("umar" , err);
                toast.error(err.response?.data?.message);
            })
    }

    const signupTeacher = () => {
        const mainData = new FormData();
        mainData.append("name" , formValues?.name ? formValues?.name : "")
        mainData.append("email" , formValues?.email ? formValues?.email : "")
        mainData.append("password" , formValues?.password ? formValues?.password : "")
        mainData.append("subject" , formValues?.subject ? formValues?.subject : "")
        mainData.append("age" , formValues?.age ? formValues?.age : "")
        mainData.append("gender" , formValues?.gender ? formValues?.gender : "")
        mainData.append("price" , formValues?.price ? formValues?.price : "")
        mainData.append("education" , formValues?.education ? formValues?.education : "")
        mainData.append("description" , formValues?.description ? formValues?.description : "")
        mainData.append("location" , formValues?.location ? formValues?.location : "")
        mainData.append("image" , formValues?.image ? formValues?.image : null)
        axios.post("http://localhost:9000/api/teachers/create", mainData).then
            ((res) => {
                console.log("umar", res);
                toast.success(res.data?.message);
                setTimeout(() => {
                    history.push("/login")
                }, 1000);
            }).catch((err) => {
                debugger
                console.log("umar" , err);
                toast.error(err.response?.data?.message);
            })
    }

    const handleSubmit = () => {
        if (tab === "STUDENT") signupStudent();
        else signupTeacher();
    }

    console.log("object", formValues)
    return (
        <>
         <ToastContainer />
         <div className='overflow-hidden login-form' >
           
           <div className="row" style={{ height: "100vh" }}>

               <div className="col-lg-6 col-sm-12 px-5 py-3 d-flex flex-column gap-3 justify-content-center" style={{ height: "100vh", overflow: "auto", background: "#000000" }} >

                   <div className="d-flex justify-content-center">
                       <div className="w-75 p-5 position-relative" style={{ background: "rgb(9 9 9)", border: "1px solid #282626" }}>
                           {step !== 1 && <IoMdArrowBack color='gray' fontSize={25} onClick={() => {
                               if (step === 2) {
                                   setStep(1)
                               }
                               else if (step === "student" || step === "teacher") {
                                   setStep(2)
                               }
                           }} className="mb-0 " style={{ position: "absolute", top: "15px", cursor: "pointer", left: "15px" }} />}
                           <div className="d-flex justify-content-center">
                               <img src={Logo} alt="" className='w-50' />
                           </div>
                           {/* <div className="d-flex gap-1 justify-content-center mt-3">
         
               <h5 style={{ color: tab === "STUDENT" ? "#FFC632" : "#fff" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("STUDENT")}>Student</h5>
               <h5 style={{ color: tab === "TEACHER" ? "#FFC632" : "#fff" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("TEACHER")}>Teacher</h5>
           </div> */}
                           {/* <h4 className='text-center mb-0' style={{color:"#AFB6C2" , fontWeight:"bold"}}>LOGIN AS {tab}</h4> */}
                           {step === 1 ? <div>
                               <div className="d-flex flex-column gap-1 text-white mt-3">
                                   <label htmlFor="" className='fs-4'>Username <span style={{ color: "red" }}>*</span></label>
                                   <div className='input-div'>
                                       <MdOutlineEmail className='fs-4' />
                                       <input name='name' className='fs-4' onChange={handleChange} type="text" placeholder='Enter username' />
                                   </div>

                               </div>
                               <div className="d-flex flex-column gap-1 text-white mt-3">
                                   <label htmlFor="" className='fs-4'>Email <span style={{ color: "red" }}>*</span></label>
                                   <div className='input-div'>
                                       <MdOutlineEmail className='fs-4' />
                                       <input name='email' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Email' />
                                   </div>

                               </div>
                               <div className="d-flex flex-column gap-1 text-white mt-3">
                                   <label htmlFor="" className='fs-4'>Password <span style={{ color: "red" }}>*</span> </label>
                                   <div className='input-div'>
                                       <CiLock className='fs-4' />
                                       <input name='password' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Password' />
                                   </div>
                               </div>
                               <div className="loginbtn">
                                   {/* onClick={handleSubmit} */}
                                   <button className=' w-100 mt-3 fs-4' onClick={() => setStep(2)}>Sign Up</button>
                               </div>
                               <div className="text-center">
                                   <p className="mb-0 mt-1 text-white">If you already have an account please <Link style={{ textDecoration: "none" }} to="/signup">  <span style={{ fontSize: "18px", color: "yellow", cursor: "pointer" }}>Login</span></Link></p>
                               </div>
                           </div> : step === 2 ?
                               <div className="d-flex flex-column gap-2">
                                   <p className="mb-0 mt-1 text-white mt-3 text-center" style={{ fontSize: "16px", fontFamily: "monospace" }}>Are you Sign up as </p>
                                   <div className="d-flex gap-2 justify-content-center mt-3">
                                       <button className='fs-4' style={{ background: "yellow", padding: "10px 15px", borderRadius: "4px", width: "100px", color: "#000", fontFamily: "monospace", border: "none" }} onClick={() => setStep("student")}>Student</button>
                                       <button className='fs-4' style={{ background: "yellow", padding: "10px 15px", borderRadius: "4px", width: "100px", color: "#000", fontFamily: "monospace", border: "none" }} onClick={() => setStep("teacher")}>Teacher</button>
                                   </div>
                               </div>

                               : step === "student" ?
                                   <div>
                                        <div className="d-flex flex-column gap-1 text-white mt-3">
                                           <label htmlFor="" className='fs-4'>Image <span style={{ color: "red" }}>*</span> </label>
                                           <div className='input-div'>
                                               <input className='fs-4' onChange={handleImageChange} type="file" placeholder='Enter Subject' />
                                           </div>
                                       </div>

                                       <div className="d-flex flex-column gap-1 text-white mt-3">
                                           <label htmlFor="" className='fs-4'>Subject <span style={{ color: "red" }}>*</span> </label>
                                           <div className='input-div'>
                                               <CiLock className='fs-4' />
                                               <input name='subject' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Subject' />
                                           </div>
                                       </div>
                                       <div className="d-flex flex-column gap-1 text-white mt-3">
                                           <label htmlFor="" className='fs-4'>Age <span style={{ color: "red" }}>*</span> </label>
                                           <div className='input-div'>
                                               <CiLock className='fs-4' />
                                               <input name='age' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Age' />
                                           </div>
                                       </div>
                                       <div className="d-flex flex-column gap-1 text-white mt-3">
                                           <label htmlFor="" className='fs-4'>Gender <span style={{ color: "red" }}>*</span> </label>
                                           <div className='input-div'>
                                               {/* <CiLock/>
               <input name='subject' onChange={handleChange} type="text" placeholder='Enter Subject' /> */}
                                               <select name="gender" className='fs-4' onChange={handleChange} id="" style={{ background: "#000" }}>
                                                   <option value="">Select gender</option>
                                                   <option value="Male">Male</option>
                                                   <option value="Female">Female</option>
                                               </select>
                                           </div>
                                       </div>
                                       <div className="loginbtn">
                                           {/* onClick={handleSubmit} */}
                                           <button className=' w-100 mt-3 fs-4' onClick={handleSubmit}>Create</button>
                                       </div>
                                   </div>

                                   : step === "teacher" ? <div>
                                       <div style={{ height: "50vh", overflowY: "scroll", padding: "10px", width: "100%" }}>
                                       <div className="d-flex flex-column gap-1 text-white mt-3">
                                           <label htmlFor="" className='fs-4'>Image <span style={{ color: "red" }}>*</span> </label>
                                           <div className='input-div'>
                                               <input className='fs-4' onChange={handleImageChange} type="file" placeholder='Enter Subject' />
                                           </div>
                                       </div>
                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Subject <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   <input name='subject' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Subject' />
                                               </div>
                                           </div>
                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Age <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   <input name='age' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Age' />
                                               </div>
                                           </div>

                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Gender <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   {/* <CiLock/>
               <input name='subject' onChange={handleChange} type="text" placeholder='Enter Subject' /> */}
                                                   <select name="gender" className='fs-4' onChange={handleChange} id="" style={{ background: "#000" }}>
                                                       <option value="">Select gender</option>
                                                       <option value="Male">Male</option>
                                                       <option value="Female">Female</option>
                                                   </select>
                                               </div>
                                           </div>


                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Price <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   <input name='price' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Subject' />
                                               </div>
                                           </div>

                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Education <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   {/* <input name='education' onChange={handleChange} type="text" placeholder='Enter Subject' /> */}
                                                   <select name="education" className='fs-4' onChange={handleChange} id="" style={{ background: "#000" }}>
                                                       <option value="">Select Education</option>
                                                       <option value="English">English</option>
                                                       <option value="Mathematics">Mathematics</option>
                                                       <option value="Science">Science</option>
                                                       <option value="Social Studies">Social Studies</option>
                                                       <option value="History">History</option>
                                                       <option value="Geography">Geography</option>
                                                       <option value="Physics">Physics</option>
                                                       <option value="Chemistry">Chemistry</option>
                                                       <option value="Biology">Biology</option>
                                                       <option value="Environmental Science">Environmental Science</option>
                                                       <option value="Physical Education">Physical Education</option>
                                                       <option value="Health Education">Health Education</option>
                                                       <option value="Foreign Languages (e.g., Spanish, French, German)">Foreign Languages (e.g., Spanish, French, German)</option>
                                                       <option value="Computer Science">Computer Science</option>
                                                       <option value="Information Technology">Information Technology</option>
                                                       <option value="Arts (e.g., Visual Arts, Performing Arts)">Arts (e.g., Visual Arts, Performing Arts)</option>
                                                       <option value="Music">Music</option>
                                                       <option value="Economics">Economics</option>
                                                       <option value="Business Studies">Business Studies</option>
                                                       <option value="Home Economics">Home Economics</option>
                                                       <option value="Philosophy">Philosophy</option>
                                                       <option value="Psychology">Psychology</option>
                                                       <option value="Sociology">Sociology</option>
                                                       <option value="Government">Government</option>
                                                       <option value="Religious Studies">Religious Studies</option>
                                                       <option value="Technical Education">Technical Education</option>

                                                   </select>
                                               </div>
                                           </div>


                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Description <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   <input name='description' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Subject' />
                                               </div>
                                           </div>
                                           <div className="d-flex flex-column gap-1 text-white mt-3">
                                               <label htmlFor="" className='fs-4'>Location <span style={{ color: "red" }}>*</span> </label>
                                               <div className='input-div'>
                                                   <CiLock className='fs-4' />
                                                   <input name='location' className='fs-4' onChange={handleChange} type="text" placeholder='Enter Subject' />
                                               </div>
                                           </div>
                                       </div>
                                       <div className="loginbtn">
                                           {/* onClick={handleSubmit} */}
                                           <button className=' w-100 mt-3 fs-4' onClick={handleSubmit}>Create</button>
                                       </div>
                                   </div>
                                       : ""}

                       </div>
                   </div>
                   {/* <div className="d-flex gap-3 justify-content-center" style={{paddingTop: tab === "TEACHER" && "400px"}}>
               <h5 style={{borderBottom: tab === "STUDENT" ? "1px solid #238fdd" : "" , color: tab === "STUDENT" ? "#238fdd" : "gray" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("STUDENT")}>Student</h5>
               <h5 style={{borderBottom: tab === "TEACHER" ? "1px solid #238fdd" : "" , color: tab === "TEACHER" ? "#238fdd" : "gray" , padding:"10px" , cursor:"pointer" }} onClick={() => setTab("TEACHER")}>Teacher</h5>
           </div>
           <h2 className='text-center mb-0' style={{color:"#8683f9" , fontWeight:"bold" }}>SIGNUP AS {tab}</h2>
           <div className="d-flex flex-column gap-1">
               <h5>Name</h5>
               <input name='name' onChange={handleChange} type="text" className='form-control' placeholder='Enter Name' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Subject</h5>
               <input name='subject' onChange={handleChange} type="text" className='form-control' placeholder='Enter Subject' />
           </div>
         { tab === "TEACHER" &&
          <>
           <div className="d-flex flex-column gap-1">
               <h5>Price</h5>
               <input name='price' onChange={handleChange} type="text" className='form-control' placeholder='Enter Price' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Education</h5>
               <input name='education' onChange={handleChange} type="text" className='form-control' placeholder='Enter Education' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Description</h5>
               <input name='description' onChange={handleChange} type="text" className='form-control' placeholder='Please Describe About Yourself' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Location</h5>
               <input name='location' onChange={handleChange} type="text" className='form-control' placeholder='Enter Location' />
           </div>
          </>    
           }
           <div className="d-flex flex-column gap-1">
               <h5>Age</h5>
               <input name='age' onChange={handleChange} type="text" className='form-control' placeholder='Enter Age' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Gender</h5>
               <input name='gender' onChange={handleChange} type="text" className='form-control' placeholder='Enter Gender' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Email</h5>
               <input name='email' onChange={handleChange} type="text" className='form-control' placeholder='Enter Email' />
           </div>
           <div className="d-flex flex-column gap-1">
               <h5>Password</h5>
               <input name='password' onChange={handleChange} type="text" className='form-control' placeholder='Enter Password' />
           </div>
           <div className="loginbtn">
               <button className='btn btn-primary w-100 mt-3' onClick={handleSubmit}>Sign Up</button>
           </div>
           */}
               </div>
               <div className="col-lg-6 col-sm-12 h-100 px-0" >
                   <div className="image" style={{ height: "100%", width: "100%" }}>
                       <img src={BackgroundBg} alt="" className='w-100' style={{ height: "100%", width: "100%" }} />
                   </div>
               </div>
           </div>
       </div>
        </>
       
    )
}

export default SignUp;
