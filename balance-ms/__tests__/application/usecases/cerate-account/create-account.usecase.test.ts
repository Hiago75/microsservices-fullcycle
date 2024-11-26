import CreateAccountUseCase from "@application/usecases/create-account/create-account.usecase";
import Account from "@domain/entities/account";

describe("Unit test create account use case", () => {
    const account = new Account(
        "id",
        "accountId",
        50,
        new Date()
    );

    const newAccount = new Account(
        "id",
        "account_id",
        50,
        new Date()
    )

    const mockRepository = () => {
        return {
            createAccount: jest.fn().mockReturnValue(newAccount),
            updateBalance: jest.fn(),
            findById: jest.fn()
        }
    }

    it("should not create an account with invalid balance", async () => {
        const accountRepository = mockRepository();
        const useCase = new CreateAccountUseCase(accountRepository);

        const input = {
            accountId: "account_id",
            balance: -1
        }

        await expect(useCase.execute(input)).rejects.toThrow("Invalid balance");
    })

    it("should not create an account with invalid account id", async () => {
        const accountRepository = mockRepository();
        const useCase = new CreateAccountUseCase(accountRepository);

        accountRepository.findById.mockReturnValue(Promise.resolve(account));

        const input = {
            accountId: "accountId",
            balance: 50
        }

        await expect(useCase.execute(input)).rejects.toThrow("Account already exists");
    })

    it("should create an account", async () => {
        const accountRepository = mockRepository();
        const useCase = new CreateAccountUseCase(accountRepository);

        accountRepository.findById.mockReturnValue(Promise.resolve(undefined));

        const input = {
            accountId: "account_id",
            balance: 50
        }

        const result = await useCase.execute(input);

        expect(result.id).toBeDefined();
        expect(result.accountId).toBe("account_id");
        expect(result.balance).toBe(50);
    })
})