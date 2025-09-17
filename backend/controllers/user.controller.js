import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// Toggle save/unsave job for user
export const toggleSaveJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.jobId;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ success: false, message: "Job not found" });

        if (!user.profile.savedJobs) user.profile.savedJobs = [];
        const jobIdString = jobId.toString();
        const index = user.profile.savedJobs.findIndex(j => j.toString() === jobIdString);
        let action;
        if (index === -1) {
            user.profile.savedJobs.push(jobId);
            action = 'saved';
        } else {
            user.profile.savedJobs.splice(index, 1);
            action = 'unsaved';
        }
        await user.save();
        return res.status(200).json({ success: true, message: `Job ${action} successfully.`, savedJobs: user.profile.savedJobs });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// REGISTER
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "Something is missing", success: false });
        }
        let profilePhotoUrl = "";
        if (req.file) {
            const fileUri = getDataUri(req.file);
            const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            profilePhotoUrl = cloudResponse.secure_url;
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists with this email.', success: false });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile: { profilePhoto: profilePhotoUrl }
        });

        // Auto-login after signup
        const tokenData = { userId: newUser._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        return res.status(201)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
            })
            .json({
                message: "Account created successfully.",
                success: true,
                user: {
                    _id: newUser._id,
                    fullname: newUser.fullname,
                    email: newUser.email,
                    phoneNumber: newUser.phoneNumber,
                    role: newUser.role,
                    profile: newUser.profile
                }
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// LOGIN
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) return res.status(400).json({ message: "Something is missing", success: false });

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Incorrect email or password.", success: false });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ message: "Incorrect email or password.", success: false });

        if (role !== user.role) return res.status(400).json({ message: "Account doesn't exist with current role.", success: false });

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userData = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
            })
            .json({ message: `Welcome back ${user.fullname}`, user: userData, success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// LOGOUT
export const logout = async (req, res) => {
    try {
        return res.status(200)
            .cookie("token", "", {
                maxAge: 0,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax"
            })
            .json({ message: "Logged out successfully.", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};

// GET CURRENT USER
export const me = async (req, res) => {
    try {
        const userId = req.id;
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        return res.status(200).json({
            success: true,
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// UPDATE PROFILE
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        let cloudResponse = null;
        if (req.file) {
            const fileUri = getDataUri(req.file);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        }

        const skillsArray = skills ? skills.split(",") : undefined;
        const user = await User.findById(req.id);
        if (!user) return res.status(400).json({ message: "User not found.", success: false });

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;
            user.profile.resumeOriginalName = req.file.originalname;
        }

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully.",
            user: {
                _id: user._id,
                fullname: user.fullname,
                email: user.email,
                phoneNumber: user.phoneNumber,
                role: user.role,
                profile: user.profile
            },
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
};
