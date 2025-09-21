// Update user
router.patch("/user/:id", async (req, res) => {
  const { fullname, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { fullname, email, role },
    { new: true }
  );
  res.json({ user });
});

// Update job
router.patch("/job/:id", async (req, res) => {
  const { title, location, salary } = req.body;
  const job = await Job.findByIdAndUpdate(
    req.params.id,
    { title, location, salary },
    { new: true }
  );
  res.json({ job });
});

// Update company
router.patch("/company/:id", async (req, res) => {
  const { name, website, location } = req.body;
  const company = await Company.findByIdAndUpdate(
    req.params.id,
    { name, website, location },
    { new: true }
  );
  res.json({ company });
});

// Update application
router.patch("/application/:id", async (req, res) => {
  const { status } = req.body;
  const application = await Application.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true }
  );
  res.json({ application });
});
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import isAdmin from "../middlewares/isAdmin.js";
import { User } from "../models/user.model.js";
import { Job } from "../models/job.model.js";
import { Company } from "../models/company.model.js";
import { Application } from "../models/application.model.js";

const router = express.Router();

// Protect all admin routes
router.use(isAuthenticated, isAdmin);

// Get all users
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.json({ users });
});

// Get all jobs
router.get("/jobs", async (req, res) => {
  const jobs = await Job.find().populate({ path: 'company', select: 'name' });
  res.json({ jobs });
});

// Get all companies
router.get("/companies", async (req, res) => {
  const companies = await Company.find();
  res.json({ companies });
});

// Get all applications
router.get("/applications", async (req, res) => {
  const applications = await Application.find()
    .populate({ path: 'applicant', select: 'fullname email' })
    .populate({ path: 'job', select: 'title' });
  res.json({ applications });
});

// Delete user
router.delete("/user/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Delete job
router.delete("/job/:id", async (req, res) => {
  await Job.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Delete company
router.delete("/company/:id", async (req, res) => {
  await Company.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Delete application
router.delete("/application/:id", async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

export default router;
