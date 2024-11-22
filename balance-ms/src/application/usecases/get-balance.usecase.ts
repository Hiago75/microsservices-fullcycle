import AccountRepositoryInterface from "@domain/repositories/account.repository.interface";
import { InputGetBalanceDTO, OutputGetBalanceDTO } from "./get-balance.dto";

export default class GetBalanceUseCase {
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