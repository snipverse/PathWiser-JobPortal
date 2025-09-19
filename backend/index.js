import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import resumeRoute from "./routes/resume.route.js";

dotenv.config({});

const app = express();

// ===================== Middleware =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ===================== CORS Setup =====================
const allowedOrigins = [
  'http://localhost:5173',                  // local dev
  'https://pathwiser-one.vercel.app'       // deployed frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }

    return callback(null, true);
  },
  credentials: true
};

app.use(cors(corsOptions));

// ===================== Routes =====================
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);
app.use("/api/v1/resume", resumeRoute);

// ===================== Server Start =====================
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running at port ${PORT}`);
});