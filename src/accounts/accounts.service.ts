import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

import { hash } from 'bcryptjs';
import { prisma } from 'src/database/prismaClient';

@Injectable()
export class AccountsService {
  async create({
    documents,
    email,
    firstName,
    lastName,
    password,
  }: CreateAccountDto) {
    const userAlreadyExists = await prisma.account.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    });

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const passwordHash = await hash(password, 8);

    const account = {
      documents,
      email,
      firstName,
      lastName,
      password: passwordHash,
    };

    await prisma.account.create({
      data: account,
    });
  }

  async findAll(): Promise<CreateAccountDto[]> {
    return await prisma.account.findMany();
  }

  async findOne(id: string): Promise<CreateAccountDto> {
    return await prisma.account.findFirst({
      where: {
        id: {
          equals: id,
          mode: 'insensitive',
        },
      },
    });
  }

  async update(id: string, { firstName, lastName, email }: UpdateAccountDto) {
    await prisma.account.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        email,
      },
    });
  }

  async remove(id: string) {
    await prisma.account.delete({
      where: {
        id: id,
      },
    });
  }
}
