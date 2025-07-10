import { Router } from "express";
import { list } from "./controllers/list";
import { create } from './controllers/create';

const JobsRouter = Router();

JobsRouter.get("/list", list);
JobsRouter.post('/', create);

export default JobsRouter;
