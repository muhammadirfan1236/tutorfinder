const router = require('express').Router();
const User = require('../models/student');
const Teacher = require('../models/teacher');
const bcrypt = require('bcrypt');
const Token = require('../models/token');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;




cloudinary.config({
  cloud_name: 'dcoyi5hkd',
  api_key: '844174441924624',
  api_secret: 'e60NVXxOapXBkzFw0RfFubYyE_M'
});

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

// Read all users
router.get('/allStudents', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;