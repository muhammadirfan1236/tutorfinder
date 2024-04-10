// import axios from 'axios';
// import React, { useEffect, useState } from 'react'
// import "../statics/css/dashboard.css"

// const Chat = () => {

//   const [teachers , setTeachers] = useState([]);
//   const [students , setStudents] = useState([]);
//   const [message , setMessage] = useState(false);
//   const [teacherId , setTeacherId] = useState("");
//   const [studentId , setStudentId] = useState("");
//   const [loading, setLoading] = useState(false);


//   const authUser = localStorage.getItem("authuser");
//   const studenttoken = localStorage.getItem("studenttoken");
//   const teachertoken = localStorage.getItem("teachertoken");
//   const dataUser = JSON.parse(localStorage.getItem("user" || null))
//   const [subject , setSubject] = useState('')


//   console.log("umaramjad" ,  dataUser?._id)


//   const teachersData = () => {
//       axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/all?subject=${subject}`).then
//       ((res) => {
//             console.log("abc" , res);
//             // const verifiedTeachers = res?.data?.filter((item) => item.verified === true);
//           setTeachers(res?.data)

//       }).catch((err) => {
//           console.log(err)
//       })
//   }

//   useEffect(() => {
//       teachersData()
//   },[]);

//   const [ teachersChat , setTeachersChat ] = useState([]);
//   const [ studentsChat , setStudentsChat ] = useState([]);

//   const teacherChat = (id) => {
//     setLoading(true);
//     // axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudentmessages/${ teachertoken ? id : authUser}/${ teachertoken ? authUser : id}`).then
//     axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudentmessages/${ teachertoken ? id : dataUser?._id}/${ teachertoken ? authUser : id}`).then
//     ((res) => {
//           console.log("debugger" , res?.data);
//           setTeachersChat(res?.data)
//           if(res?.data) setMessage(true)

//     }).catch((err) => {
//         console.log(err)
//     })
//     .finally(() => {
//       setLoading(false); // Set loading to false when the request is completed (either success or failure)
//     });
// }

// const studentChat = (id) => {
//   setLoading(true);
//   // axios.get(`${process.env.REACT_APP_BASE_URL}/api/students/getteachermessages/${ teachertoken ? id : authUser}/${ teachertoken ? authUser : id}`).then
//   axios.get(`${process.env.REACT_APP_BASE_URL}/api/students/getteachermessages/${ teachertoken ? id : dataUser?._id}/${ teachertoken ? authUser : id}`).then
//   ((res) => {
//         console.log("debugger2" , res)
//         setStudentsChat(res?.data)
//         if(res?.data) setMessage(true)

//   }).catch((err) => {
//       console.log(err)
//   })
//   .finally(() => {
//     setLoading(false); // Set loading to false when the request is completed (either success or failure)
//   });
// }


// const mainChat = teachersChat.concat(studentsChat)
// console.log("mainumar" , mainChat , teachersChat , studentsChat);
// const sortedMessages = mainChat.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

// const [specificteacherstudents , setSpecificTeacherStudents] = useState([]);


// const specificTeacherStudents = () => {
//   axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudents/${authUser}`).then
//   ((res) => {
//         console.log("dsdsdfds" , res)
//         setSpecificTeacherStudents(res?.data)      
//   }).catch((err) => {
//       console.log(err)
//   })
// }

// useEffect(() => {
//   specificTeacherStudents();
// },[])

// console.log("jkjkj" , specificteacherstudents)


// const [messageData , setMessageData] = useState("");



// const sendMessageToStudent = () => {
//   const data = {
//     message: messageData
//   }
//   axios.post(`${process.env.REACT_APP_BASE_URL}/api/students/messages/${studentId}/${authUser}` , data).then
//   ((res) => {
//         console.log("dsdsdfds" , res);

//         teacherChat(studentId);
//         studentChat(studentId); 
//         setMessage("")  
//   }).catch((err) => {
//       console.log(err)
//   })
// }




// const [allMessages , setAllMessages] = useState([]);
// // const allMessages = await Message.find({ teacherId: teacherId });
// // const studentIdsWithMessages = allMessages.map(message => message.studentId);

// // const studentsWithMessages = await User.find({ _id: { $in: studentIdsWithMessages } });
// const AllMessagesApi = () => {
//   axios.get(`${process.env.REACT_APP_BASE_URL}/api/messages`).then
//   ((res) => {
//     console.log("resmessage" , res )
//     setAllMessages(res?.data);
//     localStorage.setItems("messagesarry" , )
//   }).catch((err) => {
//     console.log(err)
//   })
// }

// useEffect(() => {
//  AllMessagesApi()
// },[])

// console.log("allmessage" , allMessages)




// const countStudentMessagesToTeachers = messages => {
//   const studentTeacherCount = {};

//   messages.forEach(message => {
//     const key = `${authUser}_${message.teacherId}`;
//     if (!studentTeacherCount[key]) {
//       studentTeacherCount[key] = {
//         studentId: message.studentId,
//         teacherId: message.teacherId,
//         count: 0
//       };
//     }
//     studentTeacherCount[key].count++;
//   });

//   return Object.values(studentTeacherCount);
// };

// let studentTeacherMessageCount = countStudentMessagesToTeachers(allMessages);
// console.log(studentTeacherMessageCount, "mmm");


// // Find if any studentId from the first array matches any studentId in the second array
// const matchingStudent = studentsChat.map(firstObj =>
//   studentTeacherMessageCount.some(secondObj => secondObj.studentId == firstObj.studentId)
// );

// console.log("matchingStudent" , matchingStudent.length)



// const sendMessageToTeacher = () => {

//   const data = {
//     message: messageData
//   }
//   axios.post(`${process.env.REACT_APP_BASE_URL}/api/teachers/messages/${dataUser?._id}/${teacherId}` , data).then
//   ((res) => {
//         console.log("dsdsdfds" , res);  
//         const newMessage = res.data; // Adjust accordingly based on your API response structure  
//         console.log("") 
//         AllMessagesApi();
//         teacherChat(teacherId);
//         studentChat(teacherId); 
//         setMessage("")  
//   }).catch((err) => {
//       console.log(err)
//   })
// }

// const sendMessage = () => {
//   if (teachertoken) sendMessageToStudent();
//   else sendMessageToTeacher();
// }



// console.log("specificteacherstudents" , specificteacherstudents)


// const timestampconverted = (timestamp) => {
//   const date = new Date(timestamp);

// const options = {
//   weekday: 'long',
//   year: 'numeric',
//   month: 'long',
//   day: 'numeric',
//   hour: 'numeric',
//   minute: 'numeric',
//   hour12: false,
//   timeZone: 'UTC' // Change this according to your timezone if needed
// };

// const formattedDate = date.toLocaleDateString('en-US', options);
// return formattedDate;
// }

// console.log("studenttoken" , studenttoken , teachers)
// const handleSubmit = (e) => {
//   e.preventDefault();
//   teachersData();
// }

//   return (
//     <div className='container-fluid p-0' >
//       <div className="row p-1" >
//         <div className="col-lg-3 col-sm-12 shadow" style={{ background:"#FFF", height:"90vh", overflow:"auto" , padding:"10px" }}>
//           { studenttoken &&
//           <>
//           <form action="#" onSubmit={handleSubmit}>
// 				<div class="form-input d-flex justify-content-between py-4 px-2 gap-3 align-items-center">
// 					{/* <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Search subject "/> */}
// 					<div class="select-box">
//               <select name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} className='fs-5 bg-light p-3'>
//                 <option hidden>Select Subject </option>
//                 <option value={""}>All</option>
//                 <option>English</option>
//                 <option>Mathematics</option>
//                 <option>Science</option>
//                 <option>Social Studies</option>
//                 <option>History</option>
//                 <option>Geography</option>
//                 <option>Physics</option>
//                 <option>Chemistry</option>
//                 <option>Biology</option>
//                  <option>Environmental Science</option> 
//                  <option>Physical Education</option> 
//                  <option>Health Education</option>

//                 <option>Foreign Languages (e.g., Spanish, French, German )</option>
//                 <option>Computer Science - Information Technology</option>
//                 <option>Business Studies</option>
//                 <option>Home Economics</option>
//                 <option>Philosophy</option> 
//                 <option>Psychology</option> 
//                 <option>Sociology</option>

//               </select>
//             </div>
// 					<button type="submit"  style={{border:"none" , borderRadius:"30px"}}><i class='bx bx-search' style={{padding:"5px" , borderRadius:"30px", fontSize:"14px" , border:"none" , background:"skyblue"}}></i></button>
// 				</div>
// 			</form>
//      { teachers.map((item , index) => (
//             <div key={index} className='d-flex mt-2' style={{cursor:"pointer" , borderBottom:"1px solid #e1d8d8" , fontSize:"13px", paddingBottom:"10px" }} onClick={() => {
//               teacherChat(item._id);
//               studentChat(item?._id);
//               setTeacherId(item._id)
//               }}>
//              <div className="image">
//                         <div className='d-flex justify-content-center align-items-center' style={{width:"100px" , border:"1px solid #dddbdb", height:"100px" , background:"rgb(245 245 245)" , borderRadius:"50px"}}>
//                             <h3 className='mb-0' style={{fontSize:"40px" , color:"rgb(193 174 174)" }}>T</h3>
//                         </div>
//                     </div>
//                     <div className=" w-100" style={{position:"relative"}}>
//                      <div className="d-flex flex-column gap-1">
//                      <div className="d-flex justify-content-between">
//                       <h5 className='mb-0' style={{color:"rgb(145 145 145)"}}>{item.name}</h5>
//                       <div style={{width:"15px" , height:"15px" , background: item.isOnline ? "green" : "lightgray" , borderRadius:"50px"}}></div>
//                       </div> 
//                       <p className='mb-0 mt-0'>{item.email}</p>
//                      </div>
//                      <div className='' style={{position:"absolute" , bottom:"10px"  }}> <span className='fw-bold'>Subject:</span> {item.subject}</div>
//                     </div>
//             </div>
//           ))}
//           </>
//          }
//           { teachertoken && specificteacherstudents.map((item , index) => (
//             <div key={index} className='d-flex mt-2' style={{cursor:"pointer" , background:"#fff" , borderRadius:"8px" }} onClick={() => {
//               teacherChat(item._id);
//               studentChat(item?._id);
//               setStudentId(item._id)
//               }}>
//              <div className="image">
//                         <div className='d-flex justify-content-center align-items-center' style={{width:"100px" , height:"100px" , background:"#b33535" , borderRadius:"10px"}}>
//                             <h3 style={{fontSize:"50px" , color:"#ffffff"}}>S</h3>
//                         </div>
//                     </div>
//                     <div className="p-2 w-100" style={{position:"relative"}}>
//                      <div className="d-flex flex-column gap-1">
//                       <div className="d-flex justify-content-between">
//                       <h5 className='mb-0'>{item.name}</h5>
//                       <div style={{width:"15px" , height:"15px" , background: item.isOnline ? "green" : "lightgray" , borderRadius:"50px"}}></div>
//                       </div>    
//                       <p className='mb-0 mt-0'>{item.email}</p>
//                      </div>
//                      <div className='' style={{position:"absolute" , bottom:"10px"  }}> <span className='fw-bold'>Subject:</span> {item.subject}</div>
//                     </div>
//             </div>
//           ))}
//         </div>
//         <div className="col-lg-9 col-sm-12" style={{position:"relative"   }}>
//           <div className="chatting p-2" style={{ height:"85vh" , overflow:"auto" }}>
//           {loading && <p>Loading...</p>}
//             {mainChat.length > 0 ?  
//             sortedMessages.map((item,index) => (
//               <>
//                <div className="teacher">
//               {item?.role === "student" && 
//               <div style={{textAlign:"left"}}>
//                 <div className="d-flex gap-3 align-items-center">
//                 <div style={{width:"400px"}}>
//                 <p className='mb-0' style={{background:"rgb(235 232 243)" , padding:"12px 13px" , fontSize:"16px", marginTop:"10px", borderRadius:"5px 20px" }}>{item.message}</p> 
//                 </div>
//                 <div className="image" style={{background:"#3a8387" , padding:"14px 22px" , color:"#fff", borderRadius:"40px"}}>T</div>
//                 </div>
//                {/* <p className='mb-0 fw-normal'>{item.teacherName}</p> */}
//                <p className='mb-0'>{timestampconverted(item.timestamp)}</p>
//               </div> 
//               }
//              </div>
//                <div className="student">
//               {item?.role === "teacher" && 
//               <div style={{textAlign:"end"}}>
//                 <div style={{textAlign:"end" , width:"100%" , display:"flex" , justifyContent:"end"}}>
//                 <div className="d-flex gap-3 align-items-center">
//                 <div className="image" style={{background:"hsla(252,13%,46%,1)" , padding:"14px 22px" , color:"#fff", borderRadius:"40px"}}>S</div>

//                 <div style={{width:"400px"}}>
//                 <p className='mb-0' style={{background:"hsla(240,7%,62%,1)" , padding:"12px 13px" , color:"#FFF", fontSize:"16px", marginTop:"10px", borderRadius:"20px 20px 0px 20px" }}>{item.message}</p>  
//                </div>
//                 </div>
//                 </div>

//                {/* <p>{item.studentName}</p> */}
//                <p className='mb-0'>{timestampconverted(item.timestamp)}</p>
//               </div>
//               }
//              </div>
//               </>

//             ))
//             : (message === true && mainChat.length === 0) ?
//              <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , height:"90vh"}}>
//               No message from this chat
//             </div>
//             : 
//             <div style={{display:"flex" , justifyContent:"center" , alignItems:"center" , height:"90vh"}}>
//             No chat selected
//           </div>
//              }
//           </div>
//           <div className="send" style={{display:"flex" , gap:"10px" , marginTop:"10px"}}>
//           <input type="text" value={messageData} onChange={(e) => setMessageData(e.target.value)} placeholder='Enter message' style={{border:"1px solid gray" , width:"100%" , padding:"10px" , borderRadius:"8px"}} />
//           <button className='btn btn-primary' onClick={sendMessage}>send</button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chat






































import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "../statics/css/dashboard.css"
import io from 'socket.io-client';
import Message from '../components/message';
const socket = io.connect("http://localhost:9000")

const Chat = () => {

  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState(false);
  const [messages, setMessages] = useState([]);
  const [teacherId, setTeacherId] = useState("");
  const [messageInput, setMessageInput] = useState('');
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [specificteacherstudents, setSpecificTeacherStudents] = useState([]);

  const authUser = localStorage.getItem("authuser");
  const studenttoken = localStorage.getItem("studenttoken");
  const teachertoken = localStorage.getItem("teachertoken");
  const dataUser = JSON.parse(localStorage.getItem("user" || null))
  const [subject, setSubject] = useState('')
  const teachersData = () => {
    setLoading(true)
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/all?subject=${subject}`).then
      ((res) => {
        console.log("abc", res);
        if (res) setLoading(false)
        // const verifiedTeachers = res?.data?.filter((item) => item.verified === true);
        setTeachers(res?.data)

      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    teachersData()
  }, []);

  const specificTeacherStudents = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/getstudents/${authUser}`).then
      ((res) => {
        console.log("dsdsdfds", res)
        setSpecificTeacherStudents(res?.data)
      }).catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    specificTeacherStudents();
  }, [])

  useEffect(() => {
    fetchMessages();
    // Listen for incoming messages
    socket.on('message', handleIncomingMessage);

    // Clean up
    return () => {
      console.log('Disconnecting socket...');
      socket.off('message', handleIncomingMessage);
    };
  }, []);

  // Define a separate function to handle incoming messages
  const handleIncomingMessage = (data) => {
    console.log('Received message:', data);
    setMessages((prevMessages) => [...prevMessages, data]);
  };


  const fetchMessages = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/messages/${studentId ? studentId : authUser}/${teacherId ? teacherId : authUser ? authUser : ""}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log("data", data)
      setMessages(data?.messages);

    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  const handleMessageSend = () => {
    // Emit the message to the server
    socket.emit('message', {
      sender: authUser,  // this is student sender 
      recipient: teacherId ? teacherId : studentId ? studentId : "", // this is teacher 
      //   sender: "6601d623f760d2f4ce92d42b",  // this is teacher sender 
      //   recipient: "6601d5b5f760d2f4ce92d429", // this is student 
      content: messageInput
    });

    // Update the messages state locally
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   { sender: authUser , recipient: studenttoken ? studentId : teachertoken ? teacherId : "" , content: messageInput } // this is student to teacher messages
    // //   { sender: "6601d623f760d2f4ce92d42b", recipient: "6601d5b5f760d2f4ce92d429", content: messageInput } // this is teacher to student messages
    // ]);

    // Clear the message input
    setMessageInput('');

  };

  console.log("teachers", teachers, teacherId, authUser)

  const handleSubmit = (e) => {
    e.preventDefault();
    teachersData();
  }

  useEffect(() => {
    if (teacherId || studentId) fetchMessages()
  }, [teacherId, studentId])

  const allUpdateMessages = messages.sort((a, b) => {
    return new Date(a.createdAt) - new Date(b.createdAt);
  });


  return (
    <div className='container-fluid p-0' >
      <div className="row p-1" >
        <div className="col-lg-3 col-sm-12 shadow" style={{ background: "#FFF", height: "90vh", overflow: "auto", padding: "10px" }}>
          {studenttoken &&
            <>
              <form action="#" onSubmit={handleSubmit}>
                <div class="form-input d-flex justify-content-between py-4 px-2 gap-3 align-items-center">
                  {/* <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Search subject "/> */}
                  <div class="select-box">
                    <select name='subject' value={subject} onChange={(e) => setSubject(e.target.value)} className='fs-5 bg-light p-3'>
                      <option hidden>Select Subject </option>
                      <option value={""}>All</option>
                      <option>English</option>
                      <option>Mathematics</option>
                      <option>Science</option>
                      <option>Social Studies</option>
                      <option>History</option>
                      <option>Geography</option>
                      <option>Physics</option>
                      <option>Chemistry</option>
                      <option>Biology</option>
                      <option>Environmental Science</option>
                      <option>Physical Education</option>
                      <option>Health Education</option>

                      <option>Foreign Languages (e.g., Spanish, French, German )</option>
                      <option>Computer Science - Information Technology</option>
                      <option>Business Studies</option>
                      <option>Home Economics</option>
                      <option>Philosophy</option>
                      <option>Psychology</option>
                      <option>Sociology</option>

                    </select>
                  </div>
                  <button type="submit" style={{ border: "none", borderRadius: "30px" }}><i class='bx bx-search' style={{ padding: "5px", borderRadius: "30px", fontSize: "14px", border: "none", background: "skyblue" }}></i></button>
                </div>
              </form>
              {loading ? "Loading..." : teachers.length > 0 ? teachers.map((item, index) => (
                <div key={index} className='d-flex mt-2 gap-2' style={{ cursor: "pointer", borderBottom: "1px solid #e1d8d8", fontSize: "13px", paddingBottom: "10px", background: item._id === teacherId ? "#ebe8e8" : "", padding: "10px 5px" }} onClick={() => setTeacherId(item?._id)}>
                  <div className="image">
                    <div className='d-flex justify-content-center align-items-center' style={{ width: "100px", border: "1px solid #dddbdb", height: "100px", background: "rgb(245 245 245)", borderRadius: "50px" }}>
                      {/* <h3 className='mb-0' style={{fontSize:"40px" , color:"rgb(193 174 174)" }}>T</h3> */}
                      <img src={item.image} alt="" style={{ width: "100px", height: "100px", borderRadius: "50px" }} />
                    </div>
                  </div>
                  <div className=" w-100" style={{ position: "relative" }}>
                    <div className="d-flex flex-column gap-1">
                      <div className="d-flex justify-content-between">
                        <h5 className='mb-0' style={{ color: "rgb(145 145 145)" }}>{item?.name}</h5>
                        <div style={{ width: "15px", height: "15px", background: item.isOnline ? "green" : "lightgray", borderRadius: "50px" }}></div>
                      </div>
                      <p className='mb-0 mt-0'>{item?.email}</p>
                    </div>
                    <div className='' style={{ position: "absolute" }}> <span className='fw-bold'>Subject:</span> {item?.subject}</div>
                  </div>
                </div>
              ))
                : "No teacher found"
              }
            </>
          }
          {teachertoken && specificteacherstudents.map((item, index) => (
            <div key={index} className='d-flex mt-2' style={{ cursor: "pointer", background: "#fff", borderRadius: "8px", background: item._id === studentId ? "#ebe8e8" : "", padding: "8px" }} onClick={() => setStudentId(item?._id)}>
              <div className="image">
                <div className='d-flex justify-content-center align-items-center' style={{ width: "100px", height: "100px", borderRadius: "50px" }}>
                  {/* <h3 style={{fontSize:"50px" , color:"#ffffff"}}>S</h3> */}
                  <img src={item.image} alt="" style={{ width: "100px", height: "100px", borderRadius: "50px" }} />

                </div>
              </div>
              <div className="p-2 w-100" style={{ position: "relative" }}>
                <div className="d-flex flex-column gap-1">
                  <div className="d-flex justify-content-between">
                    <h5 className='mb-0'>{item.name}</h5>
                    <div style={{ width: "15px", height: "15px", background: item.isOnline ? "green" : "lightgray", borderRadius: "50px" }}></div>
                  </div>
                  <p className='mb-0 mt-0'>{item.email}</p>
                </div>
                {/* <div className='' style={{position:"absolute" , bottom:"10px"  }}> <span className='fw-bold'>Subject:</span> {item.subject}</div> */}
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-9 col-sm-12" style={{ position: "relative" }}>
          <div className="chatting p-2" style={{ height: "85vh", overflow: "auto" }}>
            {allUpdateMessages?.map((message, index) => (
              <Message key={index} message={message} currentUser={authUser} />
            ))}
            {console.log("studentId", studentId, teacherId)}
            {(studentId || teacherId) ? "" : <div className="d-flex justify-content-center align-items-center h-100">
              No Chat Selected
            </div>}
          </div>
          <div className="send" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <input type="text" value={messageInput} onChange={(e) => setMessageInput(e.target.value)} placeholder='Enter message' style={{ border: "1px solid gray", width: "100%", padding: "10px", borderRadius: "8px" }} />
            <button className='btn btn-primary' onClick={handleMessageSend}>send</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chat
