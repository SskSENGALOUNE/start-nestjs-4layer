// Command คือ "คำสั่ง" ที่ส่งมาจาก Controller
// มีหน้าที่เก็บข้อมูลเท่านั้น ไม่มี logic ใดๆ
// ตั้งชื่อแบบ VerbNoun เสมอ เช่น CreateUser, UpdateUser, DeleteUser

export class CreateUserCommand {
  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly createdBy: string,

  ) { }
}
