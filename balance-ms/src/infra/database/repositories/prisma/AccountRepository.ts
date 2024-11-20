import Account from "@domain/entities/Account";
import { PrismaClient } from "@prisma/client";
import BalanceRepositoryInterface from "src/domain/repositories/BalanceRepository.interface";

export default class AccountRepository implements BalanceRepositoryInterface {
    constructor(private prisma: PrismaClient) {}

    async createAccount(accountId: string, balance: number): Promise<string> {
        const accountDb = await this.prisma.account.create({
            data: {
                accountId: accountId,
                balance: balance
            }
        })  

        return accountDb.id
    }

    async updateBalance(accountId: string, balance: number): Promise<void> {
        const accountDb = await this.prisma.account.findUnique({
            where : {
                accountId: accountId
            }
        })

        if (accountDb === null) {
            throw new Error("Account not found")
        }

        await this.prisma.account.update({
            where : {
                accountId: accountId
            },
            data: {
                balance: balance
            }
        })
    }

    async getBalance(accountId: string): Promise<Account> {
        const accountDb = await this.prisma.account.findUnique({
            where : {
                accountId: accountId
            }
        })

        if (accountDb === null) {
            throw new Error("Account not found")
        }

        return new Account(
            accountDb.id,
            accountDb.accountId,
            accountDb.balance,
            accountDb.updatedAt
        )
    }   
}