const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// Configure dotenv for development environment
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

// Setting up Nodemailer with environment variables
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email transport setup
contactEmail.verify((error) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email Service Ready");
  }
});

// Contact form endpoint
router.post("/contact", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  const mail = {
    from: name,
    to: process.env.EMAIL_USER, // Use environment variable for recipient
    subject: "Contact Form Submission - Portfolio",
    html: `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `,
  };

  contactEmail.sendMail(mail, (error) => {
    if (error) {
      console.error("Email sending error:", error);
      res.json({
        code: 500,
        status: "Error",
        message: "Failed to send email",
        error: error.message,
      });
    } else {
      res.json({
        code: 200,
        status: "Success",
        message: "Email sent successfully",
      });
    }
  });
});

module.exports = app;
