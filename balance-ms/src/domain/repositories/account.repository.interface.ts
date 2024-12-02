import Account from "@domain/entities/account"

export default interface AccountRepositoryInterface {
    createAccount(accountId: string, balance: number): Promise<Account>
    updateBalance(accountId: string, balance: number): Promise<Account>
    findById(accountId: string): Promise<Account>
}