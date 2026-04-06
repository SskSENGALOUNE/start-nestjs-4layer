import { HttpException, HttpStatus } from '@nestjs/common';

// 1. กรณีหาไม่เจอ (สำคัญมาก!)
export class CategoryNotFoundException extends HttpException {
    constructor(id: string) {
        super(`Category with ID ${id} not found`, HttpStatus.NOT_FOUND);
    }
}

// 2. กรณีชื่อซ้ำ (อันที่คุณมีอยู่แล้ว แต่ปรับให้เป็น Http)
export class CategoryAlreadyExistsException extends HttpException {
    constructor(name: string) {
        super(`Category name "${name}" already exists`, HttpStatus.CONFLICT);
    }
}

// 3. กรณีลบไม่ได้ เพราะมีสินค้าใช้งานอยู่ (ป้องกัน Data Error)
export class CategoryInUseException extends HttpException {
    constructor() {
        super('Cannot delete category because it is linked to existing products', HttpStatus.BAD_REQUEST);
    }
}