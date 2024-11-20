import Account from "@domain/entities/Account"

export default interface BalanceRepositoryInterface {
    createAccount(accountId: string, balance: number): Promise<string>
    updateBalance(accountId: string, balance: number): Promise<void>
    getBalance(accountId: string): Promise<Account>
}