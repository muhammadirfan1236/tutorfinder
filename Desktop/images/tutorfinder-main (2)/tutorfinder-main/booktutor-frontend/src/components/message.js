import React from 'react'

const Message = ({ message, currentUser , loading }) => {
    const isSentByCurrentUser = message.sender === currentUser;
  return (
    <div style={{ textAlign: isSentByCurrentUser ? 'left' : 'right' }}>
    <p style={{padding:"15px" , borderRadius:"8px", background: isSentByCurrentUser ? "#ebe8e8" : "#b1ceeb" }}>{message.content}</p>
  </div>
  )
}

export default Message
