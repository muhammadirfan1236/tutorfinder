const router = require('express').Router();
const Teacher = require('../models/teacher');
const User = require('../models/student');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const SocketMessages = require('../models/socketmessages');

// Multer setup for file uploads

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

const upload = multer({ storage: storage });

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
      teacher = await new Teacher({ ...req.body, image: imageUrl, password: passwordHash }).save();

      res.status(200).json({
        success: true,
        message: "Registered successfully",
        user: teacher
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


router.get('/:id/verify/:token', async (req, res) => {
  try {
    const teacher = await Teacher.findOne({ _id: req.params.id });
    if (!teacher)
      return res.status(400).send({ message: 'Invalid Link' });

    const token = await Token.findOne({ userId: teacher._id, token: req.params.token });
    if (!token)
      return res.status(400).send({ message: 'Invalid Link or Expired' });

    await Teacher.findOneAndUpdate({ _id: teacher._id }, { verified: true });

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

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found.' });
    }

    if (!teacher.verified) {
      return res.status(403).json({ message: 'Email not verified.' });
    }

    const passwordMatch = await bcrypt.compare(password, teacher.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Check if user is already online
    // if (teacher.isOnline) {
    //   return res.status(200).json({ message: 'Teacher already logged in.' });
    // }

    teacher.isOnline = true;
    await teacher.save();

    let token = null;

    if (teacher) {
      token = teacher.generateAuthToken();
      res.status(200).send({ userData: teacher, tokens: { access_token: token, expires_in: "1d" }, message: 'Logged in Successfully.' });
    }

    // // Password is correct, proceed with login
    // res.status(200).json({ message: 'Login successfully' , teacher });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/logout', async (req, res) => {


  try {
    const { email } = req.body;
    const teacher = await Teacher.findOne({ email });
    teacher.isOnline = false;
    await teacher.save();
    res.status(200).send(teacher)
    // res.status(200).json({ message: 'Login successfully' , user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all users
router.get('/all', async (req, res) => {
  try {


    let query = {}; // Default empty query object

    // Check if the 'subject' query parameter is present
    // if (req.query.subject) {
    //     // If subject query parameter is present, add it to the query object
    //     query.subject = req.query.subject;
    // }
    // Check if the 'subject' query parameter is present
    if (req.query.subject) {
      // Use case-insensitive regex to search for subjects containing the provided query string
      query.subject = { $regex: new RegExp(req.query.subject, 'i') };
    }
    const teachers = await Teacher.find(query);
    console.log("object", teachers)
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read a single item by ID
router.get('/get/:id', async (req, res) => {
  try {
    const itemId = req.params.id;
    const item = await Teacher.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// specific students which students send message to which teacher 
router.get('/getstudents/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    console.log("teacherId", teacherId)

    const allMessages = await SocketMessages.find({ recipient: teacherId });
    console.log("allMessages", allMessages)
    const studentIdsWithMessages = allMessages.map(message => message.sender);


    const studentsWithMessages = await User.find({ _id: { $in: studentIdsWithMessages } });

    console.log("studentsWithMessages", studentIdsWithMessages)

    res.json(studentsWithMessages);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a user by ID
router.delete('/deleteTeacher/:id', async (req, res) => {

  try {
    const teacherId = req.params.id;
    console.log("teacherId" , teacherId)
    const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
    
    if (!deletedTeacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

