import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 * @body {username , email, password }
 */
export async function register(req, res) {
  const { username, email, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User with this email or username already exists",
      success: false,
    });
  }

  const user = await userModel.create({ username, email, password });

  const emailVerificationToken = jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_SECRET,
  );

  await sendEmail({
    to: email,
    subject: "Welcome to Thinkora!",
    html: `<p>Hii ${username}</p>
    <p>Thank you for registering at Thinkora.We're excited here to have you on board!</p>
    <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br>The Thinkora Team</p>
    <p></p>`,
  });

  res.status(201).json({
    message: "User registered successfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

/**
 * @desc Verify user's email address
 * @route POST /api/auth/verify-email
 * @access Public
 * @body { token }
 */

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log(decoded);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
  <h1>Email Verified Successfully</h1>
  <p>Your email has been verified. You can now login to your account.</p>
  <a href="http://localhost:3000/login">Go to Login</a>
  `;
    return (res.send = html);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid or expired token",
      success: false,
      err: err.message,
    });
  }
}

/**
 * @desc Login user and return JWT token
 * @route POST /api/auth/login
 * @access Public
 * @body {email, password }
 */

export async function login(req, res) {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "User not found",
    });
  }

  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return res.status(400).json({
      message: "Invalid email or password",
      success: false,
      err: "Incorrect password",
    });
  }

  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email before logged in",
      success: false,
      err: "Email not verified",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );
  res.cookie("token", token);

  res.status(200).json({
    message: "Login successful",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}
