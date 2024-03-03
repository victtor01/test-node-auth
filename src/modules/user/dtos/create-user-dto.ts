export class CreateUserDto {
  public name: string;
  public email: string;
  public password: string;
  
  constructor(data: CreateUserDto) {
    Object.assign(this, data);
  }
}
