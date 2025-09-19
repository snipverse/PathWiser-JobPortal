import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";

export const uploadResume = async (req, res) => {
  try {
    const userId = req.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }

    // Convert file to base64 (same way you handle profile photos)
    const fileUri = getDataUri(req.file);

    // Upload to Cloudinary as raw
    const cloudResponse = await cloudinary.uploader.upload(fileUri.content, {
      resource_type: "raw", // needed for PDFs
      folder: "resumes",
    });

    // Save URL to user profile
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          "profile.resume": cloudResponse.secure_url,
          "profile.resumeOriginalName": req.file.originalname,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Resume uploaded successfully",
      resumeUrl: cloudResponse.secure_url,
      user,
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", success: false });
  }
};
