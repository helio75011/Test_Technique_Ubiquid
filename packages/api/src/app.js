import cors from "cors";
import express from "express";
import JobsRouter from "./features/jobs/router";

const app = express();

app.use(cors());

app.use("/jobs", JobsRouter);

export { app };
