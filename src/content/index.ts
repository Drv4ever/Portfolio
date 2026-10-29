import { PortfolioContent, PortfolioContentSchema } from "./schema";

export const rawContent = {
  profile: {
    name: "Dhruv Jain",
    nickname: "Drv4ever",
    role: "Full-Stack Developer & AI Systems Builder",
    headline: "Building intelligent web products, AI agents & event-driven cloud systems.",
    bio: "Information Technology undergraduate at Vellore Institute of Technology. I engineer full-stack platforms, autonomous AI agent protocols (MCP, LangGraph), and event-driven AWS cloud architectures.",
    location: "Vellore, India",
    avatar: "/avatar.png",
    email: "dhruvjain632@gmail.com",
    socials: [
      {
        label: "Email",
        href: "mailto:dhruvjain632@gmail.com",
        icon: "Mail",
      },
      {
        label: "LinkedIn",
        href: "https://linkedin.com/in/dhruv-jain-4284a8263/",
        icon: "Linkedin",
      },
      {
        label: "GitHub",
        href: "https://github.com/Drv4ever",
        icon: "Github",
      },
      {
        label: "Twitter",
        href: "https://x.com/Drv4ever632",
        icon: "Twitter",
      },
    ],
  },

  education: [
    {
      institution: "Vellore Institute of Technology",
      degree: "B.Tech in Information Technology",
      period: "2024 – 2028",
      location: "Vellore, India",
      score: "CGPA: 9.08",
    },
    {
      institution: "Delhi Public School",
      degree: "Higher Secondary Education (Class XII)",
      period: "2023 – 2024",
      location: "Gwalior, India",
      score: "Percentage: 89.2%",
    },
  ],

  skills: [
    {
      category: "Languages",
      skills: ["JavaScript (ES6+)", "TypeScript", "C++", "SQL", "HTML", "CSS"],
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express.js", "REST APIs", "JWT Authentication"],
    },
    {
      category: "Frontend",
      skills: ["React.js", "Vite", "Tailwind CSS"],
    },
    {
      category: "Databases",
      skills: ["MongoDB", "PostgreSQL", "Vector DB"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS (EC2, S3, Lambda, DynamoDB, SNS, SQS)", "Git", "GitHub", "Vercel"],
    },
    {
      category: "AI & LLM",
      skills: [
        "RAG",
        "Embeddings",
        "Qdrant (Vector Database)",
        "Chunking Strategies",
        "RAG Evaluation",
        "Prompt Engineering",
        "Prompt Chaining",
        "LLM APIs (Groq)",
      ],
    },
    {
      category: "AI Agents",
      skills: ["ReAct Agents", "LangGraph", "Model Context Protocol (MCP)"],
    },
    {
      category: "Testing & Tools",
      skills: ["Jest", "Vitest", "Postman"],
    },
    {
      category: "Core CS",
      skills: ["Data Structures & Algorithms", "OOP", "DBMS"],
    },
  ],

  projects: [
    {
      id: "slide-os",
      title: "SlideOS — AI-Powered Presentation Builder",
      shortTitle: "SlideOS",
      tagline: "Natural-language presentation generator with exact-count server enforcement, rich editor, and PPTX/PDF export.",
      description:
        "Full-stack web app that generates slide outlines from prompts using AI (Groq JSON mode), supports visual drag-and-drop editing, JWT authentication, MongoDB persistence, and dual PPTX/PDF export.",
      bullets: [
        "Built a full-stack app (React, Node.js, Express, MongoDB) that turns a natural-language prompt into a designed slide deck using an LLM (Groq, JSON mode), with tunable slide count, tone, and audience; the server enforces the exact slide count and falls back to a deterministic generator if the LLM fails.",
        "Implemented JWT and bcrypt authentication with Google OAuth, owner-only access control on decks, and public read-only share links that never expose user IDs.",
        "Developed an editor with drag-and-drop reordering, undo/redo, debounced autosave, 12 themes, and PPTX/PDF export through a shared layout engine.",
        "Wrote 209 automated tests (78 Jest backend, 131 Vitest frontend) covering validators, controllers, services, and hooks.",
      ],
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Groq LLM",
        "JWT",
        "Google OAuth",
        "Jest",
        "Vitest",
      ],
      category: "spotlight",
      active: true,
      status: "Active",
      github: "https://github.com/Drv4ever/SlideOS",
      live: "https://slide-os.vercel.app/",
      testStats: {
        total: 209,
        backendJest: 78,
        frontendVitest: 131,
      },
      slideThemesCount: 12,
      architectureSteps: [
        {
          step: 1,
          title: "Prompt Input",
          detail: "Natural-language prompt with user-tunable tone, audience, and slide count parameters.",
        },
        {
          step: 2,
          title: "Groq LLM (JSON Mode)",
          detail: "High-speed LLM generation returning strictly structured schema output.",
        },
        {
          step: 3,
          title: "Server Enforcement & Fallback",
          detail: "Backend enforces exact slide count; falls back to deterministic generator if LLM fails.",
        },
        {
          step: 4,
          title: "Interactive Canvas Editor",
          detail: "Visual drag-and-drop reordering, undo/redo history stack, debounced autosave, and 12 themes.",
        },
        {
          step: 5,
          title: "Shared Layout Engine",
          detail: "Export engine generating pixel-accurate PPTX decks and printable PDFs.",
        },
      ],
    },
    {
      id: "mongo-mcp",
      title: "MongoDB MCP Server for AI Tools",
      shortTitle: "MongoDB MCP",
      tagline: "TypeScript Model Context Protocol server exposing controlled, read-only database inspection to LLMs.",
      description:
        "Production-grade MCP server for safe MongoDB inspection: lists collections, infers schemas from live samples, and runs strictly read-only, allowlisted queries. Built with TypeScript, Zod validation, and Docker-ready deployment.",
      bullets: [
        "Built a TypeScript Model Context Protocol (MCP) server that gives AI tools structured access to MongoDB, with schema inference and collection discovery.",
        "Enforced a read-only security model that blocks write operations and exposes only controlled queries to AI clients.",
        "Used the MCP SDK and Zod to validate every request for type-safe communication between AI tools and the database.",
      ],
      techStack: [
        "TypeScript",
        "Node.js",
        "MongoDB",
        "Model Context Protocol (MCP)",
        "Zod",
        "Docker",
      ],
      category: "featured",
      github: "https://github.com/Drv4ever/mongo-schema-explainer-mcp",
      architectureSteps: [
        {
          step: 1,
          title: "AI Client",
          detail: "LLM agent (Claude, Cursor, custom ReAct tool) queries the database interface.",
        },
        {
          step: 2,
          title: "MCP Server",
          detail: "Official MCP SDK validates request payloads against strict Zod type definitions.",
        },
        {
          step: 3,
          title: "Read-Only Security Guard",
          detail: "Enforces strict read-only query allowlist; categorically blocks mutations and drops.",
        },
        {
          step: 4,
          title: "MongoDB Database",
          detail: "Executes controlled queries, collection discovery, and probabilistic schema inference.",
        },
      ],
    },
    {
      id: "parcel-locker",
      title: "Cloud-Based Digital Locker & Parcel Notification System",
      shortTitle: "Parcel Locker",
      tagline: "Event-driven AWS architecture with EC2 warden dashboard, S3 photo capture, and automated notifications.",
      description:
        "Full cloud-native parcel logistics system featuring a warden dashboard on EC2, automated photo upload to S3, barcode scanning, and asynchronous event notifications via SNS, SQS, and EventBridge.",
      bullets: [
        "Built the warden dashboard on EC2 (Node.js, Express) to log parcels with photo upload, scan pickup codes, and view live parcel status from DynamoDB.",
        "Integrated S3 for parcel photo storage and invoked the core-logic Lambda from the dashboard in an event-driven AWS architecture (Lambda, DynamoDB, SNS, SQS, EventBridge).",
        "Tested the system end to end, including SNS fan-out, dead-letter queue alarms, and scheduled state auditing, and wrote the project documentation.",
      ],
      techStack: [
        "AWS EC2",
        "AWS Lambda",
        "AWS DynamoDB",
        "AWS S3",
        "AWS SNS",
        "AWS SQS",
        "EventBridge",
        "Node.js",
        "Express",
      ],
      category: "featured",
      github: "https://github.com/Drv4ever",
      architectureSteps: [
        {
          step: 1,
          title: "EC2 Warden Dashboard",
          detail: "Node.js & Express portal for parcel intake, barcode scan, and photo capture.",
        },
        {
          step: 2,
          title: "S3 & Core Lambda",
          detail: "Image uploaded to S3 bucket; core-logic Lambda invoked with signed parcel metadata.",
        },
        {
          step: 3,
          title: "DynamoDB Storage",
          detail: "Real-time ledger updates parcel state, locker allocation, and pickup verification tokens.",
        },
        {
          step: 4,
          title: "SNS Fan-out & SQS DLQ",
          detail: "Asynchronous notification fan-out with Dead-Letter Queue alarm monitoring.",
        },
        {
          step: 5,
          title: "EventBridge Auditing",
          detail: "Scheduled cron audits reconcile parcel aging, unclaimed locker alerts, and hardware status.",
        },
      ],
    },
    {
      id: "tcras",
      title: "TCRAS — Transfer Chain Risk Amplification System",
      shortTitle: "TCRAS",
      tagline: "Real-time file transfer platform with Python FastAPI risk engine and Isolation Forest anomaly scoring.",
      description:
        "A secure file transfer platform with a React frontend, Node.js transfer APIs, a Python FastAPI risk engine, and ML-based anomaly scoring to evaluate transfer-chain risk in real time.",
      bullets: [
        "A secure file transfer platform with a React frontend, Node.js transfer APIs, a Python FastAPI risk engine, and ML-based anomaly scoring to evaluate transfer-chain risk in real time.",
        "Incorporated Isolation Forest anomaly scoring with NumPy and pandas data pipelines to flag atypical propagation patterns.",
        "Engineered SQLite audit logging and real-time risk classification for distributed transfer chains.",
      ],
      techStack: [
        "React",
        "Node.js",
        "Express",
        "FastAPI",
        "Python",
        "Isolation Forest",
        "pandas",
        "NumPy",
        "SQLite",
      ],
      category: "featured",
      live: "https://tcras.vercel.app/",
      github: "https://github.com/Drv4ever/TCRAS",
      architectureSteps: [
        {
          step: 1,
          title: "React Frontend",
          detail: "Interactive transfer management interface displaying real-time chain risk scores.",
        },
        {
          step: 2,
          title: "Node.js Transfer APIs",
          detail: "Express endpoints orchestrating file chunks, metadata validation, and network socket transfers.",
        },
        {
          step: 3,
          title: "FastAPI Risk Engine",
          detail: "High-concurrency Python microservice extracting propagation metadata and transmission features.",
        },
        {
          step: 4,
          title: "Isolation Forest Scoring",
          detail: "Machine learning anomaly detection scoring chain risk probability using pandas and NumPy.",
        },
        {
          step: 5,
          title: "SQLite State Store",
          detail: "Persistent local ledger recording audited transactions and risk propagation vectors.",
        },
      ],
    },
    {
      id: "vaultify",
      title: "Vaultify — Password Manager",
      shortTitle: "Vaultify",
      tagline: "Learning project exploring cryptographic backend principles, encrypted vault storage, and JWT auth.",
      description:
        "Personal learning project: a password manager built to learn backend principles. Implements encrypted vault storage, JWT authentication, and read/write routes with Node.js + Express and MongoDB. Deployed for demo and available on GitHub.",
      bullets: [
        "Personal learning project: a password manager built to learn backend principles.",
        "Implements encrypted vault storage, JWT authentication, and read/write routes with Node.js + Express and MongoDB.",
        "Containerized with Docker and deployed with demo credentials.",
      ],
      techStack: [
        "TypeScript",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT",
        "Docker",
      ],
      category: "learning",
      live: "https://vaultify-gilt.vercel.app",
      github: "https://github.com/Drv4ever/Vaultify",
    },
  ],

  achievements: [
    {
      id: "leetcode",
      title: "Problem Solving",
      metric: "220+",
      tag: "Competitive Programming",
      description:
        "Solved 220+ problems on LeetCode covering arrays, strings, trees, graphs, and dynamic programming, and practiced contest problems on Codeforces.",
    },
    {
      id: "patent",
      title: "Patent Contribution",
      tag: "Patent [Published]",
      description:
        "Contributed as a frontend developer in a 3-member team on an AI-driven system for detecting risk in distributed file propagation. [published]",
    },
  ],

  certifications: [
    {
      id: "ibm-devops",
      title: "IBM DevOps Certification",
      issuer: "IBM",
      description:
        "Comprehensive certification spanning CI/CD pipelines, containerization, agile workflows, and automated testing.",
    },
  ],

  stats: [
    {
      id: "tests",
      label: "Automated Tests",
      value: 209,
      suffix: "",
      description: "78 Jest backend + 131 Vitest frontend tests in SlideOS.",
      decimals: 0,
    },
    {
      id: "themes",
      label: "SlideOS Themes",
      value: 12,
      suffix: "",
      description: "Custom slide themes engineered with layout constraints.",
      decimals: 0,
    },
    {
      id: "leetcode",
      label: "LeetCode Solved",
      value: 220,
      suffix: "+",
      description: "Data structure and algorithm challenges completed.",
      decimals: 0,
    },
    {
      id: "cgpa",
      label: "Academic CGPA",
      value: 9.08,
      suffix: "",
      description: "Cumulative GPA at Vellore Institute of Technology.",
      decimals: 2,
    },
  ],
};

// Validated at module import time
export const content: PortfolioContent = PortfolioContentSchema.parse(rawContent);

export const {
  profile,
  education,
  skills,
  projects,
  achievements,
  certifications,
  stats,
} = content;

export const spotlightProject = projects.find((p) => p.category === "spotlight");
export const featuredProjects = projects.filter((p) => p.category === "featured");
export const learningProjects = projects.filter((p) => p.category === "learning");
