import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.model.js";

// Handles resume upload and saves URL to user profile
export const uploadResume = async (req, res) => {
  try {
    const userId = req.id;
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded", success: false });
    }
    // Upload to Cloudinary as raw, public
    const result = await cloudinary.uploader.upload_stream(
      {
        resource_type: "raw",
        folder: "resumes",
        access_mode: "public"
      },
      async (error, result) => {
        if (error) {
          return res.status(500).json({ message: "Cloudinary upload failed", success: false });
        }
        // Save resume URL to user profile
        const user = await User.findByIdAndUpdate(
          userId,
          {
            $set: {
              "profile.resume": result.secure_url,
              "profile.resumeOriginalName": req.file.originalname
            }
          },
          { new: true }
        );
        return res.status(200).json({ message: "Resume uploaded successfully", resumeUrl: result.secure_url, user, success: true });
      }
    );
    // Pipe file buffer to Cloudinary
    if (req.file && req.file.buffer) {
      require("streamifier").createReadStream(req.file.buffer).pipe(result);
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};
