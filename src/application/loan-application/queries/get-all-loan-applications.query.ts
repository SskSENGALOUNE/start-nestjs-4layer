export class GetAllLoanApplicationsQuery {
    constructor(
        public readonly status?: string // รับค่า status มาเผื่อฟิลเตอร์ (Optional)
    ) { }
}