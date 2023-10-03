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
  const { email } = req.body;
  const otpExpiryMinutes = 20;

  if (!email) {
    return res.status(400).json({ error: "Please provide either an email " });
  }

  const otp = generateOTP();
  const otpExpiration = new Date();
  otpExpiration.setMinutes(otpExpiration.getMinutes() + otpExpiryMinutes);

  try {
    let user;
    user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.otp = otp;
    user.otpExpiration = otpExpiration;

    await user.save();
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
      html: `<p><b>${otp}</b></p>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ error: "Failed to send OTP via email" });
      }
      res.send({ MSG: "sendOTP", otp: otp });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to store OTP" });
  }
};

function generateOTP() {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
}

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
