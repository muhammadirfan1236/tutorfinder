import React, { useEffect , useState } from 'react'
import { BottomCircle, Boy, RightCircle, TopCircle } from '../utils/image';
import "../statics/css/home.css"
import { subjectList, tutorListing } from '../components/constants/constants';
import { Header } from '../components';
import { useLocation ,Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  
    const [teachers , setTeachers] = useState([]);

    const teachersData = () => {
        axios.get("http://localhost:9000/api/teachers/all").then
        ((res) => {
              console.log("abc" , res)
            setTeachers(res?.data)
                
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        teachersData()
    },[])

    

    console.log("TEACHERS DATA" , teachers)

   

  return (
    <div>
        <Header/>
      <div className='container-fluid' style={{position:"relative"}}>
        <div className="row main-bg">
            <div style={{position:"absolute" , width:"100%" , height:"100%" , background:"rgb(67 155 115)" , opacity:"90%"}}></div>
            <div className="col-lg-6 col-sm-12 px-4" style={{display:"flex" , justifyContent:"center" , alignItems:"center" , position:"relative" }}>
                <div className='d-flex flex-column gap-4'>
                <h1 className='fw-bold'> <span style={{color:"#94ff93" , fontSize:"60px"}}>ONLINE TUTORING </span>THAT RELEASES POTENTIAL</h1>
                <p className='mb-0'>We can't stop you worrying about your child. But our expert tutors can help their grades and confidence soar - and help you worry a little less.</p>
                <p className='mb-0'>We can't stop you worrying about your child. But our expert tutors can help their grades and confidence soar - and help you worry a little less.</p>
                 <button style={{width:"200px"}}>Find Tutor</button>
                </div>
            </div>
            <div className="col-lg-6 col-sm-12" style={{position:"relative" }}>
                <img src={Boy} alt="" className='w-100'  />
                <div style={{position:"absolute" , top:"150px" , left:"50px"}}>
                <img src={TopCircle} alt=""  />
                </div> 
                <div style={{position:"absolute" , bottom:"30px" }}>
                <img src={BottomCircle} alt=""  />
                </div> 

                <div style={{position:"absolute" , top:"150px" , right:"50px"}}>
                <img src={RightCircle} alt="" className='w-75'  />
                </div> 
            </div>

        </div>
        <div className="mainsubjects pt-4 text-center">
            <h1>Explore Our Subjects</h1>
            <div className="row mt-4 d-flex justify-content-center">
            {subjectList.map((item,index) => (
                <div key={index} className="col-lg-3 mt-2 ms-2 mb-2  subjects p-2 col-sm-12" >
                    <div className="image">
                        <img src={item.image} alt="" />
                    </div>
                    <h5 className='fw-bold'>{item.name}</h5>
                    <p>{item.description}</p>
                </div>
            ))}
            </div>          
        </div>

        {/* <div className="row mt-4 mb-3">
            <div className="col-lg-6 col-sm-12">
                <div style={{position:"relative"}}>
                    <div style={{position:"absolute" , background:"#aeb3ba" , zIndex:"1" , width:"100%" , height:"100%" , opacity:"70%"}}></div>
                <img src="https://cdn.pixabay.com/photo/2014/08/01/01/58/coach-407290_640.jpg" alt="" className='w-100' />
                </div>
            </div>
            <div className="col-lg-6 col-sm-12 d-flex align-items-center px-4">
                <div>
                <h6 className='fs-1 fw-bold '>Tutors from £22/hour</h6>
                <p>We're very (very) picky about who we let tutor on our platform - just 1 in 8 who apply make the cut. They're experts in over 30 subjects from KS2 up to GCSE and A Level. Because they're from UK unis, they studied (and aced) the same courses as your teen in the last few years. So they explain tricky concepts in a way teens understand - and they double as cool older role models.</p>
                <p>Our expert tutor-matching team can pair your child with the perfect tutor for their needs - from subject and level, right down to exam board and personality match. They’re always on hand to listen, answer questions and give you the tailored support you need.</p>
                </div>
               
            </div>
        </div> */}
         <h1 className='text-center'>Choose your Desired Tutor</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4 mt-4 mb-2">
            {teachers.map((item,index) => (
                <div className="col mt-2">
                    <div className='tutor-card'>
                    <div className="d-flex gap-2">
                    <div className="image">
                        <div className='d-flex justify-content-center align-items-center' style={{width:"200px" , height:"230px" , background:"#b33535"}}>
                            <h3 style={{fontSize:"150px" , color:"#ffffff"}}>T</h3>
                        </div>
                    </div>
                    <div className="content p-2 ">
                    <div className="d-flex flex-column gap-2">
                        <div className="d-flex justify-content-between align-items-center">
                        <h1>{item.name}</h1>
                     <Link to={`teacher/${item._id}`}><button style={{border:"none" , padding:"8px 20px" , background:"#b33535" , borderRadius:"8px" , color:"#fff"}}>View</button></Link>  
                        </div> 
                        <h3>{item.location} - {item.education}</h3>
                        <p>{item.description}</p>
                    </div>
                    <hr />
                    <div className='d-flex flex-column gap-2'>
                        <h1>${item.price}/hr</h1>
                    </div>
                    </div>
                 </div>
                    </div>
                
                </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default Home;
