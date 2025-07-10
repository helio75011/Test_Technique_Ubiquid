import { Router } from "express";
import { list } from "./controllers/list";

const JobsRouter = Router();

JobsRouter.get("/list", list);

export default JobsRouter;
