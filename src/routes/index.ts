import { Router } from "express";

const router = Router();

// Dummy data
let jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "New York",
    salary: "$80,000 - $100,000",
    description: "We are looking for a skilled frontend developer.",
  },
  {
    id: "2",
    title: "Backend Developer",
    company: "DataSystems",
    location: "San Francisco",
    salary: "$90,000 - $120,000",
    description: "Experienced backend developer needed for our growing team.",
  },
  {
    id: "3",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$100,000 - $130,000",
    description:
      "Join our team as a full stack developer and work on exciting projects.",
  },
];

// GET all jobs
router.get("/jobs", (req, res) => {
  res.status(200).json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
});

// GET single job
router.get("/jobs/:id", (req, res) => {
  const job = jobs.find((job) => job.id === req.params.id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: "Job not found",
    });
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

// POST a new job
router.post("/jobs", (req, res) => {
  const newJob = {
    id: (jobs.length + 1).toString(),
    title: req.body.title || "Untitled Position",
    company: req.body.company || "Unknown Company",
    location: req.body.location || "Not specified",
    salary: req.body.salary || "Not disclosed",
    description: req.body.description || "No description provided",
  };

  jobs.push(newJob);

  res.status(201).json({
    success: true,
    data: newJob,
  });
});

export default router;

// import { Client, Account, ID } from 'react-native-appwrite';

// const client = new Client()
//     .setProject('67cea6f3000ee930f61f')
//     .setPlatform('com.imrandev20.workscout');
