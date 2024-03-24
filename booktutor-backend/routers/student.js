const router = require('express').Router();
const  User  = require('../models/student');
const  Teacher  = require('../models/teacher');
const  Message  = require('../models/message');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const path = require("path");
const sendEmail = require('../utils/sendEmail');
const cloudinary = require('cloudinary').v2;
const crypto = require('crypto');
const { getIO } = require('../socket');



          
cloudinary.config({ 
  cloud_name: 'dcoyi5hkd', 
  api_key: '844174441924624', 
  api_secret: 'e60NVXxOapXBkzFw0RfFubYyE_M' 
});

// // Multer setup for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });

// Multer configuration for handling file uploads


const storage = multer.diskStorage({
  filename: function (req,file,cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({storage: storage});


router.post('/create', upload.single('image'), async (req, res) => {
  try {
    // Upload image to Cloudinary
    cloudinary.uploader.upload(req.file.path, async (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          success: false,
          message: "Error"
        });
      }

      const imageUrl = result.secure_url; // URL of the uploaded image

      // Proceed with database logic after uploading the image
      let user = await User.findOne({ email: req.body.email });
      let teacher = await Teacher.findOne({ email: req.body.email });

      if (user || teacher) {
        return res.status(409).json({ message: 'Email already registered.' });
      }

      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      // Create a new user with the uploaded image URL
      user = await new User({ ...req.body, image: imageUrl, password: passwordHash }).save();

      res.status(200).json({
        success: true,
        message: "Registered successfully",
        user: user
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get('/:id/verify/:token', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user)
            return res.status(400).send({ message: 'Invalid Link' });

        const token = await Token.findOne({ userId: user._id, token: req.params.token });
        if (!token)
            return res.status(400).send({ message: 'Invalid Link or Expired' });

        await User.findOneAndUpdate({ _id: user._id }, { verified: true });

        await Token.deleteOne({ _id: token._id });

        const htmlMessage = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verified</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              text-align: center;
              margin: 0;
              padding: 20px;
            }
            .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 30px;
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              margin-top: 20px;
              text-decoration: none;
              background-color: #007bff;
              color: #fff;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }
            .btn:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Email Verified Successfully</h1>
            <p>Your email has been successfully verified. You can close this window or go back to the application.</p>
          </div>
        </body>
      </html>
    `;

        // res.status(200).send({ message: 'Email Verified Successfully' });
        res.status(200).send(htmlMessage);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});


const setUserOnline = async (userId) => {
  console.log("userId" , userId)
  try {
    await User.findByIdAndUpdate(userId, { isOnline: true });
  } catch (error) {
    console.error('Error setting user online status:', error.message);
  }
};

const setUserOffline = async (userId) => {
  try {
    await User.findByIdAndUpdate(userId, { isOnline: false });
  } catch (error) {
    console.error('Error setting user offline status:', error.message);
  }
};


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user;
    let userType;

    // Check if the email exists in the Student collection
    user = await User.findOne({ email });
    userType = 'student';

    // If the email is not found in the Student collection, check in the Teacher collection
    if (!user) {
      user = await Teacher.findOne({ email });
      userType = 'teacher';
    }

    if (!user) {
      return res.status(404).json({ message: 'Incorrect email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Update the user's online status
    user.isOnline = true;
    await user.save();

    // Generate token
    const token = user.generateAuthToken();

    // Respond with user data and token
    res.status(200).json({
      userData: user,
      userType: userType,
      tokens: { access_token: token, expires_in: "1d" },
      message: 'Logged in Successfully.'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//       const user = await User.findOne({ email });
//       const teacher = await Teacher.findOne({ email });
//        // If login is successful, fetch the latest student data
//     // const user = await User.findOne({ email }).populate('bookings');

//       // const user = await User.findOne({ email: req.body.email });
  
//       if (!user || !teacher) {
//         return res.status(404).json({ message: 'User not found.' });
//       }

//       // if (!teacher) {
//       //   return res.status(404).json({ message: 'Teacher not found.' });
//       // }
  
//       // if (!user.verified) {
//       //   return res.status(403).json({ message: 'Email not verified.' });
//       // }
  
//       const passwordMatchUser = await bcrypt.compare(password, user.password);
//       const passwordMatchTeacher = await bcrypt.compare(password, teacher.password);
  
//       if (!passwordMatchUser || !passwordMatchTeacher) {
//         return res.status(401).json({ message: 'Invalid password.' });
//       }
    

//     //    // Check if user is already online
//     // if (user.isOnline) {
//     //   return res.status(200).json({ message: 'User already logged in.' });
//     // }

//       user.isOnline = true;
//       await user.save();

//       teacher.isOnline = true;
//       await teacher.save();
       
      

  
//       // Password is correct, proceed with login

//       let token = null;

//       if(user) {
//         token = user.generateAuthToken();
//           // Update the student's session data with the latest information
//         res.status(200).send({ userData: user, tokens: {access_token: token, expires_in: "1d"} , message: 'Logged in Successfully.' });
//     }
//       if(teacher) {
//         token = teacher.generateAuthToken();
//           // Update the student's session data with the latest information
//         res.status(200).send({ userData: teacher, tokens: {access_token: token, expires_in: "1d"} , message: 'Logged in Successfully.' });
//     }

//       // res.status(200).json({ message: 'Login successfully' , user });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

  router.post('/logout', async (req, res) => {
   
  
    try {
     const { email } = req.body;
      const user = await User.findOne({ email });
      user.isOnline = false;
      await user.save();  
      res.status(200).send(user)
      // res.status(200).json({ message: 'Login successfully' , user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  

        // Read a single item by ID
router.get('/get/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await User.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Student not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/get/:studentId/:teacherId', async (req, res) => {
  try {
    const { studentId, teacherId } = req.params;

    // Find the student by studentId
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the specific chat messages for the given teacherId
    const teacherMessages = student.messages.filter(
      message => String(message.from) === teacherId
    );

    res.json(teacherMessages );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//get all notifications of student speicifc 
router.get('/getNotifications/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const student = await User.findById(studentId).populate('notifications');
    const notifications = student?.notifications;
    res.json(notifications)
} catch (error) {
    console.error('Error fetching notifications:', error);
    throw error; // Handle the error appropriately in your application
}
});


//send message to teacher

router.post('/sendmessage/:studentId/:teacherId', async (req, res) => {
  try {
    
    const { studentId , teacherId } = req.params;
    const {  message } = req.body;

    console.log("object" , studentId , teacherId , message)

    const student = await User.findById(studentId);
    const teacher = await Teacher.findById(teacherId);

    if (!student || !teacher) {
      return res.status(404).json({ message: 'Student or Teacher not found' });
    }

    teacher.messages.push({ from: studentId, message , role: "student" ,  name: student.name  });
    await teacher.save();

    const io = getIO();
    io.to(teacher).emit('studentSendMessage', { from: studentId, message });

    res.status(200).json({ message: 'Message sent to Teacher', teacher });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});



// Send a message from a student to a teacher
router.post('/messages/:studentId/:teacherId', async (req, res) => {
  try {
    const { studentId , teacherId  } = req.params;
    const {  message  } = req.body;
    const sender = await User.findById(studentId);
    const receiver = await Teacher.findById(teacherId);

    const newMessage = new Message({
      studentId: studentId,
      teacherId: teacherId,
      message,
      role: 'student',
      studentName: sender.name,
      teacherName: receiver.name,
    });

    await newMessage.save();
    res.json(newMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/getteachermessages/:studentId/:teacherId', async (req, res) => {
  try {
    const { studentId, teacherId } = req.params;

    // Find the student by studentId
    const allmessages = await Message.find();

    console.log("dda" , allmessages , teacherId)
    const allmessage = allmessages.filter((item) => item.studentId == studentId && item.teacherId == teacherId && item.role === "teacher")

    res.json(allmessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


  // Read all users
  router.get('/allStudents', async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });





















// Create user and send verification email
// router.post('/create', async (req, res) => {
//     const { studentName,subject , age ,  gender, email, password } = req.body;
  
//     try {
//       const token = crypto.randomBytes(20).toString('hex');
//       const hashedPassword = await bcrypt.hash(password, 10);
//       const newUser = new User({
//         studentName,
//         subject,
//         age,
//         gender,
//         email,
//         password: hashedPassword,
//         verificationToken: token
//       });
  
//       await newUser.save();
//       await sendVerificationEmail(email, token);
  
//       res.status(201).json({ message: 'User created. Check your email for verification.' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });
  
//   // Verify email
//   router.get('/verify/:token', async (req, res) => {
//     const token = req.params.token;
  
//     try {
//       const user = await User.findOne({ verificationToken: token });
  
//       if (!user) {
//         return res.status(404).json({ message: 'Invalid token or user not found.' });
//       }
  
//       user.verified = true;
//       user.verificationToken = undefined;
//       await user.save();
  
//       res.status(200).json({ message: 'Email verified successfully.' });
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   });

module.exports = router;