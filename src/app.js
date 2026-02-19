import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import patientRoutes from "./routes/patients.js";
import chatRoutes from "./routes/chat.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/patients", patientRoutes);
app.use("/chat", chatRoutes);

app.use((err, _req, res, _next) => {
  if (err?.code === "28P01") {
    return res.status(500).json({
      error: "Database authentication failed. Check DATABASE_URL credentials.",
    });
  }

  const status = err.status || 500;
  res.status(status).json({ error: err.message || "Server error" });
});

export default app;
