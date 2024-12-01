import AccountController from "@application/controllers/account.controller";
import GetBalanceUseCase from "@application/usecases/get-balance/get-balance.usecase";
import prisma from "@infra/database/prisma/prisma.client";
import AccountRepository from "@infra/database/repositories/prisma/account.repository";

export default class GetBalanceFactory  {
    static create() {
        const accountRepository = new AccountRepository(prisma);
        const getBalanceUseCase = new GetBalanceUseCase(accountRepository);
        
        return new AccountController(getBalanceUseCase);
    }
}