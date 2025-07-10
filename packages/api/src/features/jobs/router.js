import { Router } from "express";
import { list } from "./controllers/list";
import { create } from './controllers/create';
import { update } from './controllers/update.js';
import { remove } from "./controllers/remove.js";
import { stats } from './controllers/stats.js';

const JobsRouter = Router();

JobsRouter.get("/list", list);
JobsRouter.post('/', create);
JobsRouter.put('/:id', update);
JobsRouter.delete('/:id', remove);
JobsRouter.get('/stats', stats);

export default JobsRouter;
