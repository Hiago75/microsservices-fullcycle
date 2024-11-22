import Account from "@domain/entities/account";

describe('Account', () => {
    it("should not create an account with invalid balance", () => {
        expect(() => {
            new Account(
                'id',
                'account_id',
                -1,
                new Date()
            )
        }).toThrow("Invalid balance")
    })

    it("should create an account", () => {
        const account = new Account(
            'id',
            'account_id',
            50,
            new Date()
        )

        expect(account.id).toBe('id');
        expect(account.accountId).toBe('account_id');
        expect(account.balance).toBe(50);
        expect(account.updatedAt).toBeInstanceOf(Date);
    })

    it("should not update the balance with invalid balance", () => {
        const account = new Account(
            'id',
            'account_id',
            50,
            new Date()
        )

        expect(() => {
            account.updateBalance(-1)
        }).toThrow("Invalid balance")
    })

    it("should update the balance", () => {
        const account = new Account(
            'id',
            'account_id',
            50,
            new Date()
        )

        account.updateBalance(100)

        expect(account.balance).toBe(100)
    })
})