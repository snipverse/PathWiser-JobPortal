import { Job } from "../models/job.model.js";

// Helper function to extract min/max salary from string
const parseSalary = (salaryStr) => {
    if (!salaryStr) return { salaryMin: 0, salaryMax: 0, salaryText: "" };

    // Remove commas and symbols
    const cleaned = salaryStr.replace(/,/g, '').replace(/₹/g, '');
    const match = cleaned.match(/(\d+)\s*-\s*(\d+)/); // match "2500000 - 4000000"
    
    if (match) {
        return {
            salaryMin: Number(match[1]),
            salaryMax: Number(match[2]),
            salaryText: salaryStr
        };
    } else {
        // If no range, try to convert to a single number
        const num = Number(cleaned.match(/\d+/)?.[0] || 0);
        return { salaryMin: num, salaryMax: num, salaryText: salaryStr };
    }
};

// ================== ADMIN POST JOB ==================
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false
            });
        }

        const { salaryMin, salaryMax, salaryText } = parseSalary(salary);

        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salaryMin,
            salaryMax,
            salary: salaryText, // original text
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ================== GET ALL JOBS ==================
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ================== GET JOB BY ID ==================
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({ path: "applications" });

        if (!job) {
            return res.status(404).json({ message: "Job not found.", success: false });
        }

        return res.status(200).json({ job, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

// ================== GET ADMIN JOBS ==================
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: 'company' })
            .sort({ createdAt: -1 });

        if (!jobs || jobs.length === 0) {
            return res.status(404).json({ message: "Jobs not found.", success: false });
        }

        return res.status(200).json({ jobs, success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
};
