import { Balance } from "@prisma/client";
import PrismaBalanceRepository from "../../../../src/infra/database/repositories/prisma/BalanceRepository.prisma";

const mockPrismaClient = {
    balance: {
        findFirst: jest.fn(),
        create: jest.fn(),
        upsert: jest.fn(),
    }
}

jest.mock("../../../../src/infra/database/prisma/PrismaService", () => ({
    getInstance: jest.fn().mockReturnValue(mockPrismaClient)
}))

describe('PrismaBalanceRepository', () => {
    let balanceRepository: PrismaBalanceRepository
  
    beforeEach(() => {
      jest.clearAllMocks()
      balanceRepository = new PrismaBalanceRepository()
    })
  
    describe('findByAccountId', () => {
      it('should find balance by account id', async () => {
        const mockBalance: Balance = {
          id: 'balance-123',
          accountId: 'account-456',
          amount: 100.50,
          createdAt: new Date(),
          updatedAt: new Date()
        }
  
        mockPrismaClient.balance.findFirst.mockResolvedValue(mockBalance)
  
        const result = await balanceRepository.findByAccountId('account-456')
  
        expect(result).toEqual(mockBalance)
        expect(mockPrismaClient.balance.findFirst).toHaveBeenCalledWith({
          where: { accountId: 'account-456' }
        })
      })
  
      it('should return null if no balance found', async () => {
        mockPrismaClient.balance.findFirst.mockResolvedValue(null)
  
        const result = await balanceRepository.findByAccountId('non-existent-account')
  
        expect(result).toBeNull()
        expect(mockPrismaClient.balance.findFirst).toHaveBeenCalledWith({
          where: { accountId: 'non-existent-account' }
        })
      })
    })
  
    describe('create', () => {
      it('should create a new balance', async () => {
        const mockBalance: Balance = {
          id: 'balance-123',
          accountId: 'account-456',
          amount: 100.50,
          createdAt: new Date(),
          updatedAt: new Date()
        }
  
        mockPrismaClient.balance.create.mockResolvedValue(mockBalance)
  
        const result = await balanceRepository.insert({
          accountId: 'account-456',
          amount: 100.50
        })
  
        expect(result).toEqual(mockBalance)
        expect(mockPrismaClient.balance.create).toHaveBeenCalledWith({
          data: {
            accountId: 'account-456',
            amount: 100.50
          }
        })
      })
    })
  
    describe('updateBalance', () => {
      it('should update existing balance', async () => {
        const mockBalance: Balance = {
          id: 'balance-123',
          accountId: 'account-456',
          amount: 200.75,
          createdAt: new Date(),
          updatedAt: new Date()
        }
  
        mockPrismaClient.balance.upsert.mockResolvedValue(mockBalance)

        const result = await balanceRepository.updateBalance('account-456', 200.75)
  
        expect(result).toEqual(mockBalance)
        expect(mockPrismaClient.balance.upsert).toHaveBeenCalledWith({
          where: { accountId: 'account-456' },
          update: { amount: 200.75 },
          create: { 
            accountId: 'account-456', 
            amount: 200.75,
          }
        })
      })
    })
})