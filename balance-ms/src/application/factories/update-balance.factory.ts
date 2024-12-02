import UpdateBalanceUseCase from "@application/usecases/update-balance/update-balance.usecase";
import prisma from "@infra/database/prisma/prisma.client";
import AccountRepository from "@infra/database/repositories/prisma/account.repository";

export default class UpdateBalanceFactory  {
    static create() {
        const accountRepository = new AccountRepository(prisma);

        return new UpdateBalanceUseCase(accountRepository);
    }
}