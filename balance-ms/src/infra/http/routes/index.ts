import { Router } from "express";
import { balanceRouter } from "./balances.routes";

const router = Router();

router.use("/balances", balanceRouter);

export { router }