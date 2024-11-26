import Account from "@domain/entities/account"

export default interface AccountRepositoryInterface {
    createAccount(accountId: string, balance: number): Promise<Account>
    updateBalance(accountId: string, balance: number): Promise<void>
    findById(accountId: string): Promise<Account>
}