import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign({ email: user.email, id: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(200).json({ user: user, authToken: token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const registerUser = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    const result = await newUser.save();

    const secretKey = process.env.JWT_SECRET || "your-secret-key";
    const token = jwt.sign({ email: result.email, id: result._id }, secretKey, {
      expiresIn: "1h",
    });

    res.status(201).json({ user: result, authToken: token });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};
