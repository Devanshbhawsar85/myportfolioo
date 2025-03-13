const express = require("express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");

// Load environment variables (only in development)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Added for form-data support

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

// Configure Nodemailer with SMTP
const contactEmail = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // Use true for port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Verify email setup
contactEmail.verify((error) => {
  if (error) {
    console.error("Email configuration error:", error);
  } else {
    console.log("Email Service Ready");
  }
});

// Contact form endpoint
app.post("/contact", async (req, res) => {
  const { firstName, lastName, email, message, phone } = req.body;
  const fullName = `${firstName} ${lastName}`;

  const mailOptions = {
    from: `"${fullName}" <${email}>`,
    to: process.env.EMAIL_USER, // Your email
    subject: "Contact Form Submission - Portfolio",
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Message:</strong> ${message}</p>
    `,
  };

  try {
    await contactEmail.sendMail(mailOptions);
    res.json({
      code: 200,
      status: "Success",
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Email sending error:", error);
    res.json({
      code: 500,
      status: "Error",
      message: "Failed to send email",
      error: error.message,
    });
  }
});

module.exports = app;
