const express = require("express");
const path = require("path");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");

// server used to send send emails
const app = express();
app.use(cors());
app.use(express.json());
app.use("/", router);

// Serve static files if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder to the 'build' folder of React
  app.use(express.static(path.join(__dirname, "build")));

  // Handle all routes by serving the React app (React Router)
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
}

// Use the dynamic port from Render environment variables or fallback to 5000 locally
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});

console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

// Setting up Nodemailer to send emails
const contactEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "bhawsard75@gmail.com", // Replace with your email
    pass: "vftl yobv otlu lttc", // Replace with your email password or app-specific password
  },
});

// Verifying the email transport setup
contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});

// Handling POST request for contact form submission
router.post("/contact", (req, res) => {
  const name = req.body.firstName + " " + req.body.lastName;
  const email = req.body.email;
  const message = req.body.message;
  const phone = req.body.phone;

  // Setting up the email structure
  const mail = {
    from: name,
    to: "Bhawsard75@gmail.com", // Replace with the recipient email
    subject: "Contact Form Submission - Portfolio",
    html: `<p>Name: ${name}</p>
           <p>Email: ${email}</p>
           <p>Phone: ${phone}</p>
           <p>Message: ${message}</p>`,
  };

  // Sending the email
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json(error);
    } else {
      res.json({ code: 200, status: "Message Sent" });
    }
  });
});
