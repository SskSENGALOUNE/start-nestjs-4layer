export class UserAlreadyExistsException extends Error {
  constructor() {
    super('Username or email already exists');
    this.name = 'UserAlreadyExistsException';
  }
}

export class UserNotFoundException extends Error {
  constructor(id: string) {
    super(`User with id ${id} not found`);
    this.name = 'UserNotFoundException';
  }
}
