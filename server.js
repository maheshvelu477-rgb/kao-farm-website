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




























// const express = require("express");
// const cors = require("cors");
// // const dotenv = require("dotenv");
// const path = require("path");
// const dns = require("dns");
// // require("dotenv").config({ path: path.resolve(__dirname, ".env") });
// require("dotenv").config();

// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");

// const contactRoutes = require("./routes/contactRoutes");



// // Force DNS
// dns.setServers(["8.8.8.8", "8.8.4.4"]);



// const app = express();

// // Middleware
// // app.use(cors());
// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     // "https://kao-farm-website.netlify.app",
//     "https://delicate-syrniki-900d6b.netlify.app"
//   ],
//   credentials: true
// }));




// app.use(express.json({ limit: "10mb" })); // for image base64

 
// app.use((req, res, next) => {
//   console.log("➡️", req.method, req.url);
//   next();
// });

// // Debug env (only for development)
// console.log("EMAIL_USER:", process.env.EMAIL_USER);
// console.log("EMAIL_PASS:", process.env.EMAIL_PASS?.length ? "LOADED" : "MISSING");

// // DB Connection
// connectDB();

// app.use("/public", express.static(path.join(__dirname, "public")));

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/contact", contactRoutes);

//  app.get("/", (req, res) => {
//   res.send("KAO FARM Backend is Running 🚀");
// });

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });





















// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const dns = require("dns");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const contactRoutes = require("./routes/contactRoutes");

// dns.setServers(["8.8.8.8", "8.8.4.4"]);

// const app = express();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "https://delicate-syrniki-900d6b.netlify.app"
//   ],
//   credentials: true
// }));

// app.use(express.json({ limit: "10mb" }));

// app.use((req, res, next) => {
//   console.log("➡️", req.method, req.url);
//   next();
// });

// app.use("/public", express.static(path.join(__dirname, "public")));
// app.use("/api/users", userRoutes);
// app.use("/api/contact", contactRoutes);

// app.get("/", (req, res) => {
//   res.send("KAO FARM Backend is Running 🚀");
// });

// // ✅ Start server FIRST, then connect to DB
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`Server running on port ${PORT}`);
//   console.log("EMAIL_USER:", process.env.EMAIL_USER);
//   console.log("EMAIL_PASS:", process.env.EMAIL_PASS?.length ? "LOADED" : "MISSING");
//   console.log("MONGO_URI:", process.env.MONGO_URI ? "LOADED" : "MISSING ⚠️");

//   connectDB().catch(err => {
//     console.error("Startup DB error:", err.message);
//   });
// });





const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on 0.0.0.0:${PORT}`);
});