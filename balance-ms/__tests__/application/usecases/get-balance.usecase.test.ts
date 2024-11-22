import Account from "@domain/entities/account"
import GetBalanceUseCase from "@application/usecases/get-balance.usecase";

describe("Unit test get balance use case", () => {
    const account = new Account(
        "id",
        "accountId",
        50,
        new Date()
    );

    const mockRepository = () => {
        return {
            createAccount: jest.fn(),
            updateBalance: jest.fn(),
            findById: jest.fn().mockImplementation((id) => {
                if (id === "account_id") {
                    return Promise.resolve(undefined);
                }
                return Promise.resolve(account);
            })
        }
    }

    it("should throw an error if the account does not exists", async () => {
        const accountRepository = mockRepository();
        const useCase = new GetBalanceUseCase(accountRepository);

        const input = {
            accountId: "account_id"
        }

        await expect(useCase.execute(input)).rejects.toThrow("Account not found");
    })

    it("should return the balance", async () => {
        const accountRepository = mockRepository();
        const useCase = new GetBalanceUseCase(accountRepository);

        const input = {
            accountId: "accountId"
        }

        const result = await useCase.execute(input);

        expect(result.accountId).toBe("accountId");
        expect(result.balance).toBe(50);
        expect(result.updatedAt).toBeInstanceOf(Date);
    })
})