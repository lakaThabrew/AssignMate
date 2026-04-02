const mongoose = require("mongoose");
const crypto = require("crypto");
require("dotenv").config();
const Rubric = require("./models/Rubric");
const Evaluation = require("./models/Evaluation");
const User = require("./models/User");

const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/assignmate";

function hashPassword(password) {
  return crypto.createHash("sha256").update(String(password)).digest("hex");
}

const sampleUsers = [
  {
    name: "Student Demo",
    email: "student.demo@university.edu",
    passwordHash: hashPassword("pass1234"),
    role: "student",
  },
  {
    name: "Lecturer Demo",
    email: "lecturer.demo_staff@university.edu",
    passwordHash: hashPassword("pass1234"),
    role: "lecturer",
  },
  {
    name: "Student One",
    email: "student1@uni.edu",
    passwordHash: hashPassword("pass1234"),
    role: "student",
  },
];

const sampleRubrics = [
  {
    title: "Software Engineering Project",
    description: "Final year project evaluation rubric",
    criteria: [
      { name: "Code Quality", description: "Cleanliness, maintainability, and standard formatting.", weight: 30 },
      { name: "Functionality", description: "System works according to the requirements.", weight: 40 },
      { name: "Documentation", description: "Architecture and usage clearly documented.", weight: 30 },
    ],
    createdBy: "Prof. Smith"
  },
  {
    title: "Data Science Assignment",
    description: "Machine learning model assignment rubric",
    criteria: [
      { name: "Data Preprocessing", description: "Handling missing values and encoding data.", weight: 25 },
      { name: "Model Accuracy", description: "Performance on the test set.", weight: 50 },
      { name: "Code Organization", description: "Use of functions, classes, and modularity.", weight: 25 },
    ],
    createdBy: "Dr. Jones"
  }
];

const sampleEvaluations = [
  {
    assignmentName: "Final Year Project - Student Demo",
    userEmail: "student.demo@university.edu",
    userName: "Student Demo",
    userRole: "student",
    isGuest: false,
    scorePredicted: 85,
    strengths: ["Excellent code structure", "Thoroughly tested components"],
    weaknesses: ["Documentation lacks architectural diagrams", "Some error handling is missing"],
    missingCriteria: ["Error Handling Architecture"],
    suggestions: ["Add high-level system diagrams", "Implement global error boundaries"],
    plagiarismRisk: "Low",
    rubricBreakdown: [
      { criterion: "Code Quality", weight: 30, status: "met", score: "28/30", coveragePercent: 95, supportingEvidence: "Clear variable naming and small functions." },
      { criterion: "Functionality", weight: 40, status: "met", score: "35/40", coveragePercent: 88, supportingEvidence: "All core features working, minor bugs in edge cases." },
      { criterion: "Documentation", weight: 30, status: "partial", score: "22/30", coveragePercent: 70, supportingEvidence: "Good setup guide, but missing API docs." }
    ]
  },
  {
    assignmentName: "Data Science Assignment - Student Demo",
    userEmail: "student.demo@university.edu",
    userName: "Student Demo",
    userRole: "student",
    isGuest: false,
    scorePredicted: 72,
    strengths: ["Good choice of model", "Proper cross-validation used"],
    weaknesses: ["Data leaking in preprocessing phase", "Hardcoded file paths"],
    missingCriteria: ["Data Leakage Prevention"],
    suggestions: ["Separate train/test split before scaling", "Use relative paths for data loading"],
    plagiarismRisk: "Medium",
    rubricBreakdown: [
      { criterion: "Data Preprocessing", weight: 25, status: "partial", score: "15/25", coveragePercent: 60, supportingEvidence: "Scaling done on full dataset before splitting." },
      { criterion: "Model Accuracy", weight: 50, status: "met", score: "45/50", coveragePercent: 90, supportingEvidence: "Achieved 92% accuracy on holdout set." },
      { criterion: "Code Organization", weight: 25, status: "partial", score: "12/25", coveragePercent: 50, supportingEvidence: "Single massive script, no functions used." }
    ]
  },
  {
    assignmentName: "Lecture Batch Analytics Sample",
    userEmail: "lecturer.demo_staff@university.edu",
    userName: "Lecturer Demo",
    userRole: "lecturer",
    isGuest: false,
    scorePredicted: 90,
    strengths: ["Excellent rubric alignment", "Strong analytical depth"],
    weaknesses: ["Minor citation formatting issues"],
    missingCriteria: ["Citation consistency"],
    suggestions: ["Apply APA style checks before submission"],
    plagiarismRisk: "Low",
    rubricBreakdown: [
      { criterion: "Code Quality", weight: 30, status: "met", score: "29/30", coveragePercent: 97, supportingEvidence: "Consistent architecture and strong naming." },
      { criterion: "Functionality", weight: 40, status: "met", score: "37/40", coveragePercent: 92, supportingEvidence: "All major requirements implemented." },
      { criterion: "Documentation", weight: 30, status: "partial", score: "24/30", coveragePercent: 78, supportingEvidence: "Detailed narrative but fewer visual diagrams." }
    ]
  },
  {
    assignmentName: "Guest Student Practice Submission",
    userEmail: null,
    userName: "Guest Student",
    userRole: "student",
    isGuest: true,
    scorePredicted: 64,
    strengths: ["Basic structure is clear"],
    weaknesses: ["Weak methodology justification"],
    missingCriteria: ["Methodology depth"],
    suggestions: ["Expand the methods section with references"],
    plagiarismRisk: "Medium",
    rubricBreakdown: [
      { criterion: "Data Preprocessing", weight: 25, status: "partial", score: "14/25", coveragePercent: 56, supportingEvidence: "Partial handling of missing data." },
      { criterion: "Model Accuracy", weight: 50, status: "met", score: "38/50", coveragePercent: 76, supportingEvidence: "Reasonable model performance for baseline." },
      { criterion: "Code Organization", weight: 25, status: "partial", score: "12/25", coveragePercent: 48, supportingEvidence: "Monolithic script with limited modularity." }
    ]
  },
  {
    assignmentName: "Guest Lecturer Review Sample",
    userEmail: null,
    userName: "Guest Lecturer",
    userRole: "lecturer",
    isGuest: true,
    scorePredicted: 78,
    strengths: ["Good requirement mapping"],
    weaknesses: ["Could improve formal report quality"],
    missingCriteria: ["Advanced literature grounding"],
    suggestions: ["Add comparative discussion with prior work"],
    plagiarismRisk: "Low",
    rubricBreakdown: [
      { criterion: "Code Quality", weight: 30, status: "partial", score: "21/30", coveragePercent: 70, supportingEvidence: "Works well but style inconsistency remains." },
      { criterion: "Functionality", weight: 40, status: "met", score: "33/40", coveragePercent: 83, supportingEvidence: "Feature complete with a few non-critical bugs." },
      { criterion: "Documentation", weight: 30, status: "met", score: "24/30", coveragePercent: 80, supportingEvidence: "Readable structure and deployment notes included." }
    ]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to database. Clearing existing data...");

    await User.deleteMany({});
    await Rubric.deleteMany({});
    await Evaluation.deleteMany({});

    console.log("Adding sample users...");
    await User.insertMany(sampleUsers);

    console.log("Adding sample rubrics...");
    await Rubric.insertMany(sampleRubrics);

    console.log("Adding sample evaluations...");
    await Evaluation.insertMany(sampleEvaluations);

    console.log("Database seeded successfully!");
    console.log("Demo users (password: pass1234):");
    console.log("- student.demo@university.edu");
    console.log("- lecturer.demo_staff@university.edu");
    console.log("- student1@uni.edu");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
