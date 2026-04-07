import { TransferTransaction } from './transfer.entity';

export const TRANSFER_REPOSITORY = Symbol('TRANSFER_REPOSITORY');

export interface ITransferRepository {
    save(transfer: TransferTransaction): Promise<void>;
    findAccountById(accountId: string): Promise<{ balance: number } | null>
    updateBalances(fromAccountId: string, toAccountId: string, amount: number): Promise<void>;
    executeTransfer(transfer: TransferTransaction): Promise<void>;
}