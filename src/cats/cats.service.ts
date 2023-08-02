import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  findOne(id: number): Cat {
    console.log(`Retrieving details of cat with id: ${id}`);

    return {
      name: 'Jack',
      age: 3,
      breed: 'White Persian',
    };
  }
}
