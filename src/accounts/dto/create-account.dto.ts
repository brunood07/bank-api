interface Statement {
  type: string;
  value: number;
}

export class CreateAccountDto {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  documents: string;
  password: string;
  statements?: Statement[];
}
