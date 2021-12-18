import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('tuits')
// if use @UseGuards(AuthGuard('jwt')) then the user must be logged in
// commented in development
// @UseGuards(AuthGuard('jwt'))
export class TuitsController {

    @Get()
    getTuits() {
        return 'Tuits';
    }

    @Get(':id')
    getTuit(@Param('id') id) {
        console.log(id);
        return `Tuit ${id}`;
    }

    @Post('create')
    createTuit(@Body('message') message) {
        return 'Tuit created: ' + message;
    }

    @Patch(':id')
    updateTuit(@Param('id') id: string, @Body('tuit') tuit: string) {
        return 'Tuit updated: ' + id + ' con contenido ' + tuit;
    }

    @Delete(':id')
    deleteTuit(@Param('id') id: string) {
        return 'Tuit deleted: ' + id;
    }

}
