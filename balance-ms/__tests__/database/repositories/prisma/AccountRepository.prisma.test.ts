import AccountRepository from '@infra/database/repositories/prisma/AccountRepository'
import { prismaMock } from './prisma.singleton'
import Account from '@domain/entities/Account';

describe('AccountRepositoryPrisma', () => {
  it("should not return the balance if the account does not exists", async () => {
    const sut = new AccountRepository(prismaMock);

    prismaMock.account.findUnique.mockResolvedValue(null)

    await expect(sut.getBalance('account_id')).rejects.toThrow("Account not found");
  })

  it("should return the balance", async () => {
    const account = {
      id: 'id',
      accountId: 'account_id',
      balance: 50,
      updatedAt: new Date()
    }

    prismaMock.account.findUnique.mockResolvedValue(account)
    
    const sut = new AccountRepository(prismaMock);
    const result = await sut.getBalance('account_id');

    expect(result.accountId).toBe('account_id');
    expect(result.balance).toBe(50)
    expect(result.updatedAt).toBeInstanceOf(Date)    
  })
  
  it("should not update the balance if the account does not exists", async () => {
    const sut = new AccountRepository(prismaMock);

    prismaMock.account.findUnique.mockResolvedValue(null)

    await expect(sut.updateBalance('account_id', 30)).rejects.toThrow("Account not found");
  })
  
  it('should update the balance', async () => {
    const sut = new AccountRepository(prismaMock);

    const account = new Account(
      'id',
      'account_id',
      50,
      new Date()
    )

    prismaMock.account.findUnique.mockResolvedValue(account)

    expect(sut.updateBalance('account_id', 50)).resolves.not.toThrow()
  })

  it('should create the account', async () => {
    const sut = new AccountRepository(prismaMock); 

    const account = {
      id: "new_account_id"
    }

    prismaMock.account.create.mockResolvedValue(account)

    const result = await sut.createAccount('account_id', 50);

    expect(result).toBe("new_account_id")
  })
})