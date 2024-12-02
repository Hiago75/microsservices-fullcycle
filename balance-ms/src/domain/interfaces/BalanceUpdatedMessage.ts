export interface BalanceUpdatedMessage {
    Name: string;
    Payload: {
        account_id_from: string;
        account_id_to: string;
        balance_account_id_from: number;
        balance_account_id_to: number;
    }
} 