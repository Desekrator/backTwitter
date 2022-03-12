import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateTuitDto } from './dto/create-tuit.dto';
import { EditTuitDto } from './dto/edit-tuit.dto';
import { Tuit } from './tuit.entity';
import { TuitsService } from './tuits.service';

@Controller('tuits')
// if use @UseGuards(AuthGuard('jwt')) then the user must be logged in
// commented in development
// @UseGuards(AuthGuard('jwt'))
export class TuitsController {
  constructor(private readonly tuitsService: TuitsService) {}

  @Get()
  getTuits(): Promise<Tuit[] | void> {
    return this.tuitsService.getTuits();
  }

  @Get(':id')
  getTuit(@Param('id') id) {
    return this.tuitsService.getTuit(id);
  }

  @Post('create')
  createTuit(@Body() createTuitDto: CreateTuitDto) {
    return this.tuitsService.createTuit(createTuitDto);
  }

  @Patch(':id')
  updateTuit(@Param('id') id: string, @Body() editTuitDto: EditTuitDto) {
    return this.tuitsService.editTuit(editTuitDto);
  }

  @Delete(':id')
  deleteTuit(@Param('id') id: string) {
    return this.tuitsService.deleteTuit(id);
  }
}
