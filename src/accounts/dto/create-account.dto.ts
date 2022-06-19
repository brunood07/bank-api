interface Statement {
  type: string;
  value: number;
}

export class CreateAccountDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  cpf: string;
  password: string;
  statement: Statement[];
}
