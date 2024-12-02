import Account from "@domain/entities/account";
import { PrismaClient } from "@prisma/client";
import AccountRepositoryInterface from "src/domain/repositories/account.repository.interface";

export default class AccountRepository implements AccountRepositoryInterface {
    constructor(private prisma: PrismaClient) {}

    async createAccount(accountId: string, balance: number): Promise<Account> {
        const accountDb = await this.prisma.account.create({
            data: {
                accountId: accountId,
                balance: balance
            }
        })  

        return new Account(
            accountDb.id,
            accountDb.accountId,
            accountDb.balance.toNumber(),
            accountDb.updatedAt
        )
    }

    async updateBalance(accountId: string, balance: number): Promise<Account> {
        const updatedAccount = await this.prisma.account.upsert({
            where : {
                accountId: accountId
            },
            update: {
                balance: balance
            },
            create: {
                accountId: accountId, 
                balance: balance
            }
        })

        return new Account(
            updatedAccount.id,
            updatedAccount.accountId,
            updatedAccount.balance.toNumber(),
            updatedAccount.updatedAt
        );
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
            accountDb.balance.toNumber(),
            accountDb.updatedAt
        )
    }   
}