const User = require("../model/user");
const {
  generateToken,
  hashData,
  compareHashData,
} = require("../utils/hashing");
const nodemailer = require("nodemailer");

exports.RegisterUser = async (req, res) => {
  try {
    const { email, password,confirm_password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "Email already exists" });
    }
    if (password !== confirm_password) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const Hashpassword = await hashData(password);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: Hashpassword,
      confirm_password: Hashpassword,
    });
    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Registration failed" });
  }
};

exports.SendOtp = async (req, res) => {
  const { email ,name,company,number,message} = req.body;
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });
    const mailOptions = {
      from: process.env.MAIL_FROM,
      to: email,
      subject: "OTP Verification",
      html: `<p><b>name:-${name}</b></p>company:- ${company}</b></p> <p><b> number :-${number}</b></p><p><b> message:-${message}</b></p>`,
    };
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send OTP via email" });
      }
      res.send({ MSG: "sendOTP",mailOptions});
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store OTP" });
  }
};
exports.Login = async (req, res) => {
  const { email,otp } = req.body;
  console.log(otp, "otp");
  if (!email) {
    return res
      .status(400)
      .json({ error: "Please provide either an email" });
  } else {
      console.log(email, "email");
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      } else {
        console.log(user?.otp, "user");
        console.log(otp, "otp");
        if (user?.otp != otp) {
          return res.status(404).json({ error: "otp not found" });
        } else {
          const payload = { userId: user._id };
          const token = await generateToken(payload);
          res.json({
            MSG: "Login SuccessFully Done ",
            data: user,
            Token: token,
          });
        }
      }
  }
};
