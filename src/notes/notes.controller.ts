import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { Note } from './note.entity';
import { CreateNoteDto } from './dto/create-note.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req): Promise<Note[]> {
    return this.notesService.findAll(req.user.userId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: string): Promise<Note[]> {
    return this.notesService.findByUser(+userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Note> {
    return this.notesService.findOne(id);
  }

  @Post('note/user/:userId')
  createNote(
    @Param('userId') userId: string,
    @Body() createNotesDto: CreateNoteDto,
  ): Promise<Note> {
    // En un caso real, deberías validar que el usuario existe
    return this.notesService.createNote(createNotesDto, +userId);
  }

  @Post('notes/user/:userId')
  createNotes(
    @Param('userId') userId: string,
    @Body() createNotesDto: CreateNoteDto[],
  ): Promise<Note[]> {
    // En un caso real, deberías validar que el usuario existe
    return this.notesService.createNotes(createNotesDto, +userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() noteData: Partial<Note>,
  ): Promise<Note> {
    return this.notesService.update(id, noteData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.notesService.remove(id);
  }
}
