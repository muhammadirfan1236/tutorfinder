import React, {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'

const ViewTeacher = () => {
    const { id } = useParams();
    const [teacher , setTeacher] = useState();
    const teacherData = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/teachers/get/${id}`).then
        ((res) => {
              console.log("abc" , res)
            setTeacher(res?.data)
                
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
       teacherData()
    },[])

   

    console.log("id" , id , teacher)
  return (
    <div>
      {id}
    </div>
  )
}

export default ViewTeacher
