import AccountRepositoryInterface from "@domain/repositories/account.repository.interface";
import { InputCreateAccountDTO, OutputCreateAccountDTO } from "./create-account.dto";

export default class CreateAccountUseCase {
    constructor(private accountRepository: AccountRepositoryInterface) {}

    async execute(input: InputCreateAccountDTO): Promise<OutputCreateAccountDTO> {
        if(input.balance < 0) {
            throw new Error("Invalid balance");
        }

        const account = await this.accountRepository.findById(input.accountId);

        if(account !== undefined) {
            throw new Error("Account already exists");
        }

        const newAccount = await this.accountRepository.createAccount(input.accountId, input.balance);

        return {
            id: newAccount.id,
            accountId: newAccount.accountId,
            balance: newAccount.balance
        }
    }
}