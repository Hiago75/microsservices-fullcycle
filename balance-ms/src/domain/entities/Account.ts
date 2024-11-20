export default class Account {
    constructor(
        private _id: string, 
        private _accountId: string, 
        private _balance: number, 
        private _updatedAt: Date
    ) {
        this.validateBalance(_balance)
    }

    get id(): string {
        return this._id
    }

    get accountId(): string {
        return this._accountId
    }

    get balance(): number {
        return this._balance
    }

    get updatedAt(): Date {
        return this._updatedAt
    }
   
    set id(id: string) {
        this._id = id
    }

    set accountId(accountId: string) {
        this._accountId = accountId
    }

    updateBalance(balance: number) {
        this.validateBalance(balance)

        this._balance = balance
        this._updatedAt = new Date()
    }

    private validateBalance(balance: number) {
        if (balance < 0) {
            throw new Error("Invalid balance")
        }
    }
}