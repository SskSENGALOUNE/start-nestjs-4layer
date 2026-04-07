export class Article {
    constructor(
        public readonly id: string,
        public title: string,
        public content: string,
        public isDraft: boolean,
        public categoryId: string
    ) { }
    static create(title: string, content: string, categoryId: string): Article {
        // Business Logic: ตรวจสอบความยาวของ Title
        if (title.length < 5) {
            throw new Error("Title must be at least 5 characters long.");
        }
        // ในโลกความจริง id มักจะใช้ library เช่น uuid หรือ nanoid
        const generatedId = Math.random().toString(36).substring(2, 9);

        // คืนค่า Instance ของ Article (ค่าเริ่มต้น isDraft เป็น true)
        return new Article(
            generatedId,
            title,
            content,
            true,
            categoryId
        );
    }
}



