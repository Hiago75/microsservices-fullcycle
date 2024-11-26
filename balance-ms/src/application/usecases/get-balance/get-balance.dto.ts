export interface InputGetBalanceDTO {
    accountId: string
}

export interface OutputGetBalanceDTO {
    accountId: string
    balance: number
    updatedAt: Date
}