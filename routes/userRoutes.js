// const express = require('express');
// const router = express.Router();
// const { registerUser } = require('../controllers/userController');

// router.post('/register', registerUser);

// module.exports = router;



// const express = require("express");
// const router = express.Router();

// const {
//   registerUser,
//   getUser,
// } = require("../controllers/userController");

// // Register user
// router.post("/register", registerUser);

// // Get user
// router.get("/email/:email", getUser);

// module.exports = router;


const express = require("express");
const router = express.Router();

const {
  registerUser,
  getUser,
  loginUser,
   forgotPassword,
  resetPassword,
} = require("../controllers/userController");

// =========================
// REGISTER USER
// =========================
router.post("/register", registerUser);

// =========================
// GET USER BY EMAIL
// =========================
// use query instead of param (safer for special characters like @)
router.get("/email", getUser);
router.post("/login", loginUser);


// =========================
// FORGOT PASSWORD
// =========================
router.post("/forgot-password", forgotPassword);
 
// =========================
// RESET PASSWORD
// =========================
router.post("/reset-password/:token", resetPassword);

module.exports = router;