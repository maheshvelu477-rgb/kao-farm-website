// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   address: { type: String, required: true },
//   phone: { type: String, required: true },
//   referralId: { type: String, required: true },
//   userId: { type: String, required: true, unique: true },
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model('User', userSchema);



const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    dob: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String },
    photo: { type: String }, // base64 image from frontend
    password: { 
  type: String, 
  required: true 
},
userId: {
  type: String,
  unique: true,
  sparse: true
},

    passportActive: { type: Boolean, default: true },
    subscription: { type: String, default: "Free" },

     // ── Forgot password ──────────────────────────
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    // ─────────────────────────────────────────────
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);