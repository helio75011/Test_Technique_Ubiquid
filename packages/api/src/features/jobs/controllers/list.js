import { db } from "../../../../db/db";

export const list = (req, res) => {
  res.json(db.data.jobs);
};
