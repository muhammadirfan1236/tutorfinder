require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const crypto = require('crypto');
const { Server } = require('socket.io');
const studentRoutes = require('./routers/student');
const teacherRoutes = require('./routers/teacher');
const messageRoutes = require('./routers/messages');
const bookingRoute = require('./routers/booktutor');
const notificationRoute = require('./routers/notification');
const userRoutes = require('./routers/user');
const http = require("http");
const socketIo = require('./socket'); 
const SocketMessages = require('./models/socketmessages');
// const { Server } = require("socket.io")
 // Load environment variables

 const secretKey = crypto.randomBytes(32).toString('hex');
console.log(secretKey , "secretKey");

const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server , {
  cors: "https://tutorfinder-mkyz.vercel.app",
  // socket update url
  methods: ["GET" , "POST"]
})


// Socket.io handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Handle incoming messages
  socket.on('message', async (data) => {
    try {
      // Save the message to the database
      console.log("data" , data)
      const message = new SocketMessages(data);
      await message.save();

      // Emit the message to the recipient
      io.emit('message', data);
    } catch (error) {
      console.error('Error saving message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});







app.use(express.json());


// Mongoose connection using environment variable
const mongoURI = process.env.MONGO_URI;



mongoose.connect("mongodb+srv://irfangulzar222:admin123@atlascluster.2yte7gb.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'booktutor'
  });

  const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log("process.env.MONGO_URI" , process.env.MONGO_URI);
  console.log('Connected to MongoDB');
  console.log(secretKey , "secretKey");
});


// Routes
app.use('/api/users', userRoutes);
// app.use(express.static('uploads'));
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/bookings', bookingRoute);
app.use('/api/notifications', notificationRoute);

// io.on("connection" , (socket) => {
//   console.log(`socket id: ${socket.id}`);
//   socket.on("disconnect" , () => {
//     console.log("User Disconnected" , socket.id)
//   })
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.get('/messages/:senderId/:recipientId', async (req, res) => {
  try {
  
    const { senderId , recipientId } = req.params
    // Find the student by studentId
    // const allmessages = await SocketMessages.find();

      // Find messages where sender is senderId and recipient is recipientId
      const senderToRecipientMessages = await SocketMessages.find({
        sender: senderId,
        recipient: recipientId
      });
  
      // Find messages where sender is recipientId and recipient is senderId
      const recipientToSenderMessages = await SocketMessages.find({
        sender: recipientId,
        recipient: senderId
      });

      const allMessages = [...senderToRecipientMessages, ...recipientToSenderMessages];


    console.log("dda" ,  recipientId)
    // const allmessage = allmessages.filter((item) => item?.sender == senderId && item?.recipient == recipientId)

    res.json({message: "Success" , messages: allMessages});
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Start the server
const PORT = process.env.PORT || 9000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});