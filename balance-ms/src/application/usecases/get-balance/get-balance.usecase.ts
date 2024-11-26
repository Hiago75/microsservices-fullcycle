import AccountRepositoryInterface from "@domain/repositories/account.repository.interface";
import { InputGetBalanceDTO, OutputGetBalanceDTO } from "./get-balance.dto";
import BaseServiceInterface from "src/@shared/domain/base-service.interface";

export default class GetBalanceUseCase implements BaseServiceInterface<InputGetBalanceDTO, OutputGetBalanceDTO> {
    constructor(private accountRepository: AccountRepositoryInterface) {}

    async execute(accountId: InputGetBalanceDTO): Promise<OutputGetBalanceDTO> {
        const account = await this.accountRepository.findById(accountId.accountId);

        if(account === undefined) {
            throw new Error("Account not found");
        }

        return {
            accountId: account.accountId,
            balance: account.balance,
            updatedAt: account.updatedAt
        }
    }
}