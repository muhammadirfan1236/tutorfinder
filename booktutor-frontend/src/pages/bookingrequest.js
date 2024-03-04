import React, { useEffect, useState } from 'react'
import { Header } from '../components';
import axios from 'axios';

const BookingRequest = () => {

    const teacherId = localStorage.getItem("authuser");
    const [data , setData] = useState([])

    const studentBookingRequests = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/api/bookings/teacher/${teacherId}/studentsbookings`).then
        ((res) => {
            console.log("res" , res);
            setData(res?.data)
        }).catch((err) => {
            console.log(err)
        })
    }

    const acceptBooking = (id) => {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/bookings/teacher/${teacherId}/acceptBooking/${id}`).then
        ((res) => {
            console.log(res);
            studentBookingRequests();
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        studentBookingRequests();
    },[])
  return (
    <div>
        <Header/>
        <div className='p-3'>
        <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Student Name</th>
      <th scope="col">Subject</th>
      <th scope="col">Hourly Rate</th>
      <th scope="col">Duration</th>
      <th scope="col">Status</th>
      <th scope="col">Date Time</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    { data.map((item,index) => (
        <tr>
            <td>{index + 1}</td>
            <td>{item.studentName}</td>
            <td>{item.subject}</td>
            <td>{item.hourlyRate}</td>
            <td>{item.duration}</td>
            <td>{item.status}</td>
            <td>{item.dateTime}</td>
            <td className='d-flex gap-2'>
                <button className='btn btn-primary' onClick={() => acceptBooking(item?.bookingId)}>Accept</button>
                <button className='btn btn-danger'>Reject</button>
            </td>
        </tr>
    )) }
   
  </tbody>
</table>
        </div>
    
    </div>
  )
}

export default BookingRequest;
