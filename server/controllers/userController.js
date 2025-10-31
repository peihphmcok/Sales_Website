import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Đăng ký
export const register = async (req, res) => {
    try{
        const {name, email, password} = req.body;
        const existing = await User.findOne({email});
        if(existing)
            return res.status(400).json ({message: "Email already exists"});
        const hashed = await bcrypt.hash(password, 10)
        const user = new user({name, email, password: hashed});
        await user.save();
        res.status(201).json({message: "register successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Email Invalid" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Lấy thông tin user (bảo vệ bằng token)
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};