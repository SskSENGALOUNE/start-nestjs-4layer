export class CreateLoanApplicationCommand {
    constructor(
        public readonly customerId: string,
        public readonly monthlyIncome: number,
        public readonly requestedAmount: number,
        public readonly purpose: string,
    ) { }
}