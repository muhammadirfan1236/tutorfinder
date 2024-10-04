import { useEffect } from 'react';
import { useState } from 'react';
import io from 'socket.io-client';
import Message from '../components/message';
const socket = io.connect("http://localhost:9000")


function CheckMessages() {

  const [messages, setMessages] = useState([]);
  const [randomData , setRandomData] = useState();
  const [messageInput, setMessageInput] = useState('');
  const [shouldFetchMessages, setShouldFetchMessages] = useState(true);

  useEffect(() => {
    // Connect to Socket.io server
    // Fetch initial messages between Umar (teacher) and Amjad (student)
    fetchMessages();
    // Listen for incoming messages
    socket.on('message', (data) => {
      console.log('Received message:', data);
      setMessages((prevMessages) => [...prevMessages, data]);

    });

    // Clean up
    return () => {
      console.log('Disconnecting socket...');
      socket.disconnect();
    };
  }, []);

  console.log("datalength" , randomData)


  // useEffect(() => {
  //   // Fetch initial messages between Umar (teacher) and Amjad (student)
  //   fetchMessages();

  //   // Poll the server for updates every 5 seconds
  //   const intervalId = setInterval(fetchMessages, 5000);

  //   // Clean up
  //   return () => {
  //     clearInterval(intervalId);
  //     console.log('Disconnecting socket...');
  //     socket.disconnect();
  //   };
  // }, []);

  

  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:9000/messages/6601d5b5f760d2f4ce92d429/6601d623f760d2f4ce92d42b`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const data = await response.json();
      console.log("data" , data)
      setMessages(data?.messages);
      
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };


  const handleMessageSend = () => {
    // Emit the message to the server
    socket.emit('message', {
      sender: "6601d5b5f760d2f4ce92d429",  // this is student sender 
      recipient: "6601d623f760d2f4ce92d42b", // this is teacher 
    //   sender: "6601d623f760d2f4ce92d42b",  // this is teacher sender 
    //   recipient: "6601d5b5f760d2f4ce92d429", // this is student 
      content: messageInput
    });

    // Update the messages state locally
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "6601d5b5f760d2f4ce92d429", recipient: "6601d623f760d2f4ce92d42b", content: messageInput } // this is student to teacher messages
    //   { sender: "6601d623f760d2f4ce92d42b", recipient: "6601d5b5f760d2f4ce92d429", content: messageInput } // this is teacher to student messages
    ]);

    // Clear the message input
    setMessageInput('');
 
  };



  // const currentUser = '6601d5b5f760d2f4ce92d429'; // Example teacher ID this is student which is sender now 
  const currentUser = '6601d5b5f760d2f4ce92d429'; // Example teacher ID this is teacher which is sender now 


  return (
    <div>
    <h1>Chat CheckMessages</h1>
    <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
      {messages?.map((message, index) => (
        // <div key={index}>
        //   <strong>{message.sender}:</strong> {message.content}
        // </div>
        <Message key={index} message={message} currentUser={currentUser} />
      ))}
    </div>
    <input
      type="text"
      value={messageInput}
      onChange={(e) => setMessageInput(e.target.value)}
    />
    <button onClick={handleMessageSend}>Send</button>
  </div>
  );
}

export default CheckMessages;
