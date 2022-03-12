import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { EditTuitDto } from './dto/edit-tuit.dto';
import { Tuit } from './tuit.entity';

@EntityRepository(Tuit)
export class TuitsRepository extends Repository<Tuit> {
  async findAllTuits(): Promise<Tuit[] | void> {
    return await this.find({ relations: ['user'] });
  }

  async findTuit(id): Promise<Tuit | void> {
    return await this.findOne(id, { relations: ['user'] });
  }

  async createTuit(createTuitDto: CreateTuitDto): Promise<void> {}

  async editTuit(editTuitDto: EditTuitDto): Promise<void> {}

  async deleteTuit(id: string): Promise<void> {}
}
