// const express = require('express');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const connectDB = require('./config/db');
// const seedReferrals = require('./utils/seedReferrals');


// dotenv.config();

// connectDB().then(() => {
//   seedReferrals(); // ✅ runs AFTER DB connection
// });

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use('/api/referral', require('./routes/refferalRoutes'));
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/payment', require('./routes/paymentRoutes'));

// app.get('/api/health', (req, res) => res.json({ status: 'OK' }));

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
const path = require("path");
const dns = require("dns");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");


// Force DNS
dns.setServers(["8.8.8.8", "8.8.4.4"]);



const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // for image base64

 
app.use((req, res, next) => {
  console.log("➡️", req.method, req.url);
  next();
});

// Debug env (only for development)
console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS?.length ? "LOADED" : "MISSING");

// DB Connection
connectDB();

app.use("/public", express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/users", userRoutes);

 

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});