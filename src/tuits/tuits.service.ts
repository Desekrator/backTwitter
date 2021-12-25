import { BadRequestException, Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { EditTuitDto } from './dto/edit-tuit.dto';
import { Tuit } from './tuit.entity';
import { TuitsRepository } from './tuits.repository';

@Injectable()
export class TuitsService {

    constructor(
        @InjectRepository(TuitsRepository)
        private tuitsRepository: TuitsRepository,
    ) { }



    async getTuits(): Promise<Tuit[] | void> {

        return this.tuitsRepository.findAllTuits()

    }

    async getTuit(id): Promise<Tuit | void> {

        return this.tuitsRepository.findTuit(id);

    }

    async createTuit(createTuitDto: CreateTuitDto): Promise<void> {

        return this.tuitsRepository.createTuit(createTuitDto)

    }

    async editTuit(editTuitDto: EditTuitDto): Promise<void> {

        return this.tuitsRepository.editTuit(editTuitDto)

    }

    async deleteTuit(id: string): Promise<void> {

        return this.tuitsRepository.deleteTuit(id);

    }


}
