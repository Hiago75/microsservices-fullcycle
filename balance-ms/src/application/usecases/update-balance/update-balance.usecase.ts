import AccountRepositoryInterface from "@domain/repositories/account.repository.interface";
import { InputUpdateBalanceDTO, OutputUpdateBalanceDTO } from "./update-balance.dto";
import BaseServiceInterface from "src/@shared/domain/base-service.interface";

export default class UpdateBalanceUseCase implements BaseServiceInterface<InputUpdateBalanceDTO, OutputUpdateBalanceDTO> {
    constructor(private accountRepository: AccountRepositoryInterface) {}

    async execute(input: InputUpdateBalanceDTO): Promise<OutputUpdateBalanceDTO> {
        if(input.balance < 0) {
            throw new Error("Invalid balance");
        }
        
        const account = await this.accountRepository.updateBalance(input.accountId, input.balance);

        return {
            id: account.id,
            accountId: account.accountId,
            balance: account.balance
        }
    }
}