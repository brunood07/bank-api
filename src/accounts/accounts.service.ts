import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class AccountsService {
  public accounts = [];

  async create({
    cpf,
    email,
    firstName,
    lastName,
    password,
  }: CreateAccountDto) {
    const account = {
      id: uuid(),
      cpf,
      email,
      firstName,
      lastName,
      password,
      statement: [],
    };

    this.accounts.push(account);
  }

  async findAll(): Promise<CreateAccountDto[]> {
    return await this.accounts;
  }

  async findOne(id: string): Promise<CreateAccountDto> {
    return await this.accounts.find((item) => item.id === id);
  }

  async update(id: string, { firstName, lastName, email }: UpdateAccountDto) {
    const account = await this.accounts.findIndex((item) => item.id === id);
    this.accounts[account].firstName = firstName;
    this.accounts[account].lastName = lastName;
    this.accounts[account].email = email;
  }

  async remove(id: string) {
    await this.accounts.splice(
      this.accounts.findIndex((item) => item.id === id),
      1,
    );
  }
}
