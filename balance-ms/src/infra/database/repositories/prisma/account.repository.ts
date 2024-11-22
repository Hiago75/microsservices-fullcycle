import Account from "@domain/entities/account";
import { PrismaClient } from "@prisma/client";
import AccountRepositoryInterface from "src/domain/repositories/account.repository.interface";

export default class AccountRepository implements AccountRepositoryInterface {
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

    async findById(accountId: string): Promise<Account> {
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