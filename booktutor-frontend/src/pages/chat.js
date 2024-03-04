import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Chat = () => {

  const [teachers , setTeachers] = useState([]);
  const [students , setStudents] = useState([]);
  const [message , setMessage] = useState(false);
  const [teacherId , setTeacherId] = useState("");
  const [studentId , setStudentId] = useState("");
  const [loading, setLoading] = useState(false);


  const authUser = localStorage.getItem("authuser");
  const studenttoken = localStorage.getItem("studenttoken");
  const teachertoken = localStorage.getItem("teachertoken");
  

  console.log("umaramjad" ,  authUser)


  const teachersData = () => {
      axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/all`).then
      ((res) => {
            console.log("abc" , res);
            const verifiedTeachers = res?.data?.filter((item) => item.verified === true);
          setTeachers(verifiedTeachers)
              
      }).catch((err) => {
          console.log(err)
      })
  }

  useEffect(() => {
      teachersData()
  },[]);

  const [ teachersChat , setTeachersChat ] = useState([]);
  const [ studentsChat , setStudentsChat ] = useState([]);

  const teacherChat = (id) => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudentmessages/${ teachertoken ? id : authUser}/${ teachertoken ? authUser : id}`).then
    ((res) => {
          console.log("debugger" , res?.data);
          setTeachersChat(res?.data)
          if(res?.data) setMessage(true)
            
    }).catch((err) => {
        console.log(err)
    })
    .finally(() => {
      setLoading(false); // Set loading to false when the request is completed (either success or failure)
    });
}

const studentChat = (id) => {
  setLoading(true);
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/students/getteachermessages/${ teachertoken ? id : authUser}/${ teachertoken ? authUser : id}`).then
  ((res) => {
        console.log("debugger2" , res)
        setStudentsChat(res?.data)
        if(res?.data) setMessage(true)
          
  }).catch((err) => {
      console.log(err)
  })
  .finally(() => {
    setLoading(false); // Set loading to false when the request is completed (either success or failure)
  });
}


const mainChat = teachersChat.concat(studentsChat)
console.log("mainumar" , mainChat , teachersChat , studentsChat);
const sortedMessages = mainChat.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

const [specificteacherstudents , setSpecificTeacherStudents] = useState([]);


const specificTeacherStudents = () => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudents/${authUser}`).then
  ((res) => {
        console.log("dsdsdfds" , res)
        setSpecificTeacherStudents(res?.data)      
  }).catch((err) => {
      console.log(err)
  })
}

useEffect(() => {
  specificTeacherStudents();
},[])

console.log("jkjkj" , specificteacherstudents)


const [messageData , setMessageData] = useState("");



const sendMessageToStudent = () => {
  const data = {
    message: messageData
  }
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/messages/${studentId}/${authUser}` , data).then
  ((res) => {
        console.log("dsdsdfds" , res);
       
        teacherChat(studentId);
        studentChat(studentId); 
        setMessage("")  
  }).catch((err) => {
      console.log(err)
  })
}

const sendMessage = () => {
  if (teachertoken) sendMessageToStudent();
  else sendMessageToTeacher();
}


const [allMessages , setAllMessages] = useState([]);
// const allMessages = await Message.find({ teacherId: teacherId });
// const studentIdsWithMessages = allMessages.map(message => message.studentId);

// const studentsWithMessages = await User.find({ _id: { $in: studentIdsWithMessages } });
const AllMessagesApi = () => {
  axios.get(`${process.env.REACT_APP_BASE_URL}/api/messages`).then
  ((res) => {
    console.log("resmessage" , res )
    setAllMessages(res?.data);
    localStorage.setItems("messagesarry" , )
  }).catch((err) => {
    console.log(err)
  })
}

useEffect(() => {
 AllMessagesApi()
},[])

console.log("allmessage" , allMessages)




const countStudentMessagesToTeachers = messages => {
  const studentTeacherCount = {};

  messages.forEach(message => {
    const key = `${authUser}_${message.teacherId}`;
    if (!studentTeacherCount[key]) {
      studentTeacherCount[key] = {
        studentId: message.studentId,
        teacherId: message.teacherId,
        count: 0
      };
    }
    studentTeacherCount[key].count++;
  });

  return Object.values(studentTeacherCount);
};

let studentTeacherMessageCount = countStudentMessagesToTeachers(allMessages);
console.log(studentTeacherMessageCount, "mmm");


// Find if any studentId from the first array matches any studentId in the second array
const matchingStudent = studentsChat.map(firstObj =>
  studentTeacherMessageCount.some(secondObj => secondObj.studentId == firstObj.studentId)
);

console.log("matchingStudent" , matchingStudent.length)



const sendMessageToTeacher = () => {
 
  const data = {
    message: messageData
  }
  axios.post(`${process.env.REACT_APP_BASE_URL}/api/teachers/messages/${authUser}/${teacherId}` , data).then
  ((res) => {
        console.log("dsdsdfds" , res);  
        const newMessage = res.data; // Adjust accordingly based on your API response structure  
        console.log("") 
        AllMessagesApi();
        teacherChat(teacherId);
        studentChat(teacherId); 
        setMessage("")  
  }).catch((err) => {
      console.log(err)
  })
}



console.log("specificteacherstudents" , specificteacherstudents)


const timestampconverted = (timestamp) => {
  const date = new Date(timestamp);

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
  timeZone: 'UTC' // Change this according to your timezone if needed
};

const formattedDate = date.toLocaleDateString('en-US', options);
return formattedDate;
}



  return (
    <div className='container-fluid' >
      <div className="row p-1" style={{minHeight:"100vh"}}>
        <div className="col-lg-3 col-sm-12 shadow" style={{ background:"#FFF", height:"100vh", overflow:"auto" , border:"1px solid #e3dbdb"}}>
          { studenttoken && teachers.map((item , index) => (
            <div key={index} className='d-flex mt-2' style={{cursor:"pointer" , borderBottom:"1px solid #e1d8d8" , paddingBottom:"10px" }} onClick={() => {
              teacherChat(item._id);
              studentChat(item?._id);
              setTeacherId(item._id)
              }}>
             <div className="image">
                        <div className='d-flex justify-content-center align-items-center' style={{width:"100px" , border:"1px solid #dddbdb", height:"100px" , background:"rgb(245 245 245)" , borderRadius:"50px"}}>
                            <h3 className='mb-0' style={{fontSize:"40px" , color:"rgb(193 174 174)" }}>T</h3>
                        </div>
                    </div>
                    <div className="p-2 w-100" style={{position:"relative"}}>
                     <div className="d-flex flex-column gap-1">
                     <div className="d-flex justify-content-between">
                      <h5 className='mb-0' style={{color:"rgb(145 145 145)"}}>{item.name}</h5>
                      <div style={{width:"15px" , height:"15px" , background: item.isOnline ? "green" : "lightgray" , borderRadius:"50px"}}></div>
                      </div> 
                      <p className='mb-0 mt-0'>{item.email}</p>
                     </div>
                     <div className='' style={{position:"absolute" , bottom:"10px"  }}> <span className='fw-bold'>Subject:</span> {item.subject}</div>
                    </div>
            </div>
          ))}
          { teachertoken && specificteacherstudents.map((item , index) => (
            <div key={index} className='d-flex mt-2' style={{cursor:"pointer" , background:"#fff" , borderRadius:"8px" , border:"1px solid lightgray"}} onClick={() => {
              teacherChat(item._id);
              studentChat(item?._id);
              setStudentId(item._id)
              }}>
             <div className="image">
                        <div className='d-flex justify-content-center align-items-center' style={{width:"100px" , height:"100px" , background:"#b33535" , borderRadius:"10px"}}>
                            <h3 style={{fontSize:"50px" , color:"#ffffff"}}>S</h3>
                        </div>
                    </div>
                    <div className="p-2 w-100" style={{position:"relative"}}>
                     <div className="d-flex flex-column gap-1">
                      <div className="d-flex justify-content-between">
                      <h5 className='mb-0'>{item.name}</h5>
                      <div style={{width:"15px" , height:"15px" , background: item.isOnline ? "green" : "lightgray" , borderRadius:"50px"}}></div>
                      </div>    
                      <p className='mb-0 mt-0'>{item.email}</p>
                     </div>
                     <div className='' style={{position:"absolute" , bottom:"10px"  }}> <span className='fw-bold'>Subject:</span> {item.subject}</div>
                    </div>
            </div>
          ))}
        </div>
        <div className="col-lg-9 col-sm-12" style={{position:"relative" , background:"rgb(253 249 249)"}}>
          <div className="chatting p-2" style={{background:"rgb(253 249 249)" , height:"90vh" , overflow:"auto" }}>
          {loading && <p>Loading...</p>}
            {mainChat.length > 0 ?  
            sortedMessages.map((item,index) => (
              <>
               <div className="teacher">
              {item?.role === "student" && 
              <div style={{textAlign:"left"}}>
                <div className="d-flex gap-3 align-items-center">
                <div style={{width:"400px"}}>
                <p className='mb-0' style={{background:"rgb(235 232 243)" , padding:"12px 13px" , fontSize:"16px", marginTop:"10px", borderRadius:"5px 20px" }}>{item.message}</p> 
                </div>
                <div className="image" style={{background:"#3a8387" , padding:"14px 22px" , color:"#fff", borderRadius:"40px"}}>T</div>
                </div>
               {/* <p className='mb-0 fw-normal'>{item.teacherName}</p> */}
               <p className='mb-0'>{timestampconverted(item.timestamp)}</p>
              </div> 
              }
             </div>
               <div className="student">
              {item?.role === "teacher" && 
              <div style={{textAlign:"end"}}>
                <div style={{textAlign:"end" , width:"100%" , display:"flex" , justifyContent:"end"}}>
                <div className="d-flex gap-3 align-items-center">
                <div className="image" style={{background:"hsla(252,13%,46%,1)" , padding:"14px 22px" , color:"#fff", borderRadius:"40px"}}>S</div>
               
                <div style={{width:"400px"}}>
                <p className='mb-0' style={{background:"hsla(240,7%,62%,1)" , padding:"12px 13px" , color:"#FFF", fontSize:"16px", marginTop:"10px", borderRadius:"20px 20px 0px 20px" }}>{item.message}</p>  
               </div>
                </div>
                </div>
                
               {/* <p>{item.studentName}</p> */}
               <p className='mb-0'>{timestampconverted(item.timestamp)}</p>
              </div>
              }
             </div>
              </>
            
            ))
            : (message === true && mainChat.length === 0) ?
             <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , height:"90vh"}}>
              No message from this chat
            </div>
            : 
            <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , height:"90vh"}}>
            No chat selected
          </div>
             }
          </div>
          <div className="send" style={{display:"flex" , gap:"10px" , marginTop:"10px"}}>
          <input type="text" value={messageData} onChange={(e) => setMessageData(e.target.value)} placeholder='Enter message' style={{border:"1px solid gray" , width:"100%" , padding:"10px" , borderRadius:"8px"}} />
          <button className='btn btn-primary' onClick={sendMessage}>send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
