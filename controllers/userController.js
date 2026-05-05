// const User = require('../models/User');

// const generateUserId = () => {
//   const digits = Math.floor(100000 + Math.random() * 900000);
//   return `USER${digits}`;
// };

// const registerUser = async (req, res) => {
//   try {
//     const { name, address, phone, referralId } = req.body;

//     if (!name || !address || !phone || !referralId) {
//       return res.status(400).json({ success: false, message: 'All fields are required' });
//     }

//     const phoneRegex = /^[+]?[\d\s\-()]{7,15}$/;
//     if (!phoneRegex.test(phone)) {
//       return res.status(400).json({ success: false, message: 'Invalid phone number format' });
//     }

//     let userId;
//     let isUnique = false;
//     while (!isUnique) {
//       userId = generateUserId();
//       const existing = await User.findOne({ userId });
//       if (!existing) isUnique = true;
//     }

//     const user = new User({ name, address, phone, referralId, userId });
//     await user.save();

//     return res.status(201).json({
//       success: true,
//       message: 'User registered successfully',
//       userId,
//       user: { name, address, phone, userId }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Server error during registration' });
//   }
// };

// module.exports = { registerUser };







// const User = require("../models/User");

// // CREATE USER (Registration)
// const registerUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // check duplicate email
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

//     const newUser = new User(req.body);
//     await newUser.save();

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // GET USER BY EMAIL (optional login/support)
// const getUser = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.json(user);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   registerUser,
//   getUser,
// };




// const User = require("../models/User");

// // =========================
// // REGISTER USER
// // =========================
// const registerUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     // validate email
//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }

//     // check duplicate email
//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email already registered",
//       });
//     }

//     // create user
//     const newUser = await User.create(req.body);

//     res.status(201).json({
//       message: "User registered successfully",
//       user: newUser,
//     });
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// // =========================
// // GET USER BY EMAIL
// // =========================
// const getUser = async (req, res) => {
//   try {
//     const { email } = req.params;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   getUser,
// };





const User = require("../models/User");
const nodemailer = require("nodemailer");

console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // ⚠️ use Gmail App Password
  },
});


const sendRegistrationMail = async (userEmail, userName, userId) => {
  try {
   const info = await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to: userEmail,
      subject: "Registration Successful 🎉",
     html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    

  <!--<div style="background:#0a2540; padding:20px;">
    <img src="https://kao-farm.onrender.com/public/logo.png" height="40" />
   </div> -->


    <!-- Header -->
    <div style="background:#0a2540; color:#fff; padding:20px 30px;">
      <h2 style="margin:0;">KAO FARM</h2>
      <p style="margin:5px 0 0; font-size:13px; opacity:0.8;">Digital Passport System</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <h3 style="margin-top:0; color:#0a2540;">Welcome, ${userName}</h3>
      
      <p style="color:#555; line-height:1.6;">
        Your registration has been successfully completed. Your Farm Passport is now active.
      </p>

      <!-- Highlight Box -->
      <div style="background:#f1f5f9; padding:15px; border-radius:8px; margin:20px 0;">
        <p style="margin:0; font-size:14px; color:#333;">
          <strong>User ID:</strong> ${userId}
        </p>
      </div>

      <p style="color:#555; font-size:14px;">
        You can now access your digital passport and explore all available features.
      </p>

      <!-- CTA Button -->
      <div style="text-align:center; margin-top:25px;">
        <a href="#" style="background:#0a2540; color:#fff; padding:12px 20px; text-decoration:none; border-radius:6px; font-size:14px;">
          View Passport
        </a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; padding:15px 30px; text-align:center; font-size:12px; color:#888;">
      © 2026 KAO FARM. All rights reserved.
    </div>

  </div>
</div>
`,
    });
     console.log("User email sent:", info.messageId);
  } catch (err) {
    console.log("Mail Error:", err.message);
  }
};



const sendAdminNotification = async (userData) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL, // 👉 admin email (can be different)
      subject: "🆕 New User Registration",
      html: `
<div style="font-family: Arial, sans-serif; background:#f4f6f8; padding:30px;">
  <div style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 20px rgba(0,0,0,0.08);">
    
 <!-- <div style="background:#111827; padding:20px;">
     <img src="https://kao-farm.onrender.com/public/logo.png" height="35" />
     </div> -->
     

    <!-- Header -->
    <div style="background:#111827; color:#fff; padding:20px 30px;">
      <h2 style="margin:0;">Admin Notification</h2>
      <p style="margin:5px 0 0; font-size:13px; opacity:0.8;">New User Registration</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <h3 style="margin-top:0; color:#111827;">New User Registered</h3>

      <table style="width:100%; border-collapse:collapse; font-size:14px;">
        <tr>
          <td style="padding:8px; color:#555;"><strong>Name</strong></td>
          <td style="padding:8px;">${userData.name}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px; color:#555;"><strong>Email</strong></td>
          <td style="padding:8px;">${userData.email}</td>
        </tr>
        <tr>
          <td style="padding:8px; color:#555;"><strong>Phone</strong></td>
          <td style="padding:8px;">${userData.phone}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px; color:#555;"><strong>User ID</strong></td>
          <td style="padding:8px;">${userData.userId}</td>
        </tr>
        <tr>
          <td style="padding:8px; color:#555;"><strong>DOB</strong></td>
          <td style="padding:8px;">${userData.dob || "-"}</td>
        </tr>
        <tr style="background:#f9fafb;">
          <td style="padding:8px; color:#555;"><strong>Address</strong></td>
          <td style="padding:8px;">${userData.address || "-"}</td>
        </tr>
      </table>

      <!-- Badge -->
      <div style="margin-top:20px;">
        <span style="background:#10b981; color:#fff; padding:6px 12px; border-radius:20px; font-size:12px;">
          New Registration
        </span>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f9fafb; padding:15px 30px; text-align:center; font-size:12px; color:#888;">
      System generated email • KAO FARM Admin Panel
    </div>

  </div>
</div>
`,
    });
    
     console.log("Admin email sent:", info.messageId);
 
  } catch (err) {
    console.log("Admin Mail Error:", err.message);
  }
};




// =========================
// REGISTER USER
// =========================
 const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, dob, address, photo } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // const existingUser = await User.findOne({ email });

    // if (existingUser) {
    //   return res.status(400).json({
    //     message: "Email already exists, please login",
    //   });
    // }

    const existingUser = await User.findOne({ email });

if (existingUser) {
  console.log("Duplicate registration blocked:", email);

  return res.status(400).json({
    message: "Email already exists, please login",
  });
}


    // ✅ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

        // const generatedUserId = `KAO-${Math.floor(100000 + Math.random() * 900000)}`;
        const generatedUserId = `KAO-${Date.now().toString().slice(-6)}`;


    const newUser = await User.create({
      
      name,
      email,
      phone,
      password: hashedPassword,
      dob,
      address,
      photo,
      userId: generatedUserId,
    });


    console.log("✅ USER SAVED AFTER PAYMENT:", email);

    await sendRegistrationMail(newUser.email, newUser.name, newUser.userId);
    await sendAdminNotification(newUser);

    res.status(201).json({
      message: "User registered successfully",
        userId: newUser.userId, 
      user: newUser,
      debug: "USER SAVED AFTER PAYMENT"
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

// =========================
// GET USER BY EMAIL
// =========================
// const getUser = async (req, res) => {
//   try {
//     const { email } = req.query;

//     if (!email) {
//       return res.status(400).json({
//         message: "Email is required",
//       });
//     }

//     const user = await User.findOne({ email }).select("-__v");

//     if (!user) {
//       return res.status(404).json({
//         message: "User not found",
//       });
//     }

//     res.status(200).json(user);

//   } catch (error) {
//     console.error("Get User Error:", error);

//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// };

const getUser = async (req, res) => {
  try {
    const { email } = req.query;   // ✅ IMPORTANT (NOT req.query)

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email }).select("-password -__v");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {
    console.error("Get User Error:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};



const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ❌ If user not found
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Please register first",
      });
    }

    // ❌ Password check
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    res.status(200).json({
      message: "Login successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};



module.exports = {
  registerUser,
  getUser,
  loginUser,
};

