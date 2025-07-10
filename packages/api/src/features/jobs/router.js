import { Router } from "express";
import { list } from "./controllers/list";
import { create } from './controllers/create';
import { update } from './controllers/update.js';
import { remove } from "./controllers/remove.js";

const JobsRouter = Router();

JobsRouter.get("/list", list);
JobsRouter.post('/', create);
JobsRouter.put('/:id', update);
JobsRouter.delete('/:id', remove);

export default JobsRouter;
