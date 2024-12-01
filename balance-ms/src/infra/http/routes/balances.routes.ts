import { Router } from "express";
import GetBalanceFactory from "@application/factories/get-balance.factory";

const balanceRouter = Router();

const getBalanceController = GetBalanceFactory.create();

balanceRouter.get("/:accountId", getBalanceController.handle);

export { balanceRouter };