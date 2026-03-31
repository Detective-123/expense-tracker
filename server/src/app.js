import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// basic config
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());

// CORS config
app.use(
  cors({
    origin: "*" || "https://expense-tracker-iota-ten-30.vercel.app/",
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// import the routes
import healthCheckRouter from "./routes/healthCheck.route.js";
import authRouter from "./routes/auth.route.js";
import expenseRouter from "./routes/expense.route.js";

app.use("/api/v1/healthcheck", healthCheckRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/expense", expenseRouter);

app.get("/", (req, res) => {
  res.send("hello noobs");
});

export default app;
