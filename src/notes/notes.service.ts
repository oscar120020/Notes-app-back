import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { UsersService } from 'src/users/users.service';
import { CreateNoteDto } from './dto/create-note.dto';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    private usersService: UsersService,
  ) {}

  async findAll(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findByUser(userId: number): Promise<Note[]> {
    return this.notesRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
    });
  }

  async findOne(id: string): Promise<Note> {
    return this.notesRepository.findOne({ where: { id }, relations: ['user'] });
  }

  async createNote(
    createNoteDto: CreateNoteDto,
    userId: number,
  ): Promise<Note> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    
    const note = this.notesRepository.create({ ...createNoteDto, user });
    return this.notesRepository.save(note);
  }

  async createNotes(
    createNotesDto: CreateNoteDto[],
    userId: number,
  ): Promise<Note[]> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const notes = createNotesDto.map((noteData) =>
      this.notesRepository.create({ ...noteData, user }),
    );
    return this.notesRepository.save(notes);
  }

  async update(id: string, noteData: Partial<Note>): Promise<Note> {
    const note = await this.findOne(id);
    if (!note) {
      throw new NotFoundException('Note not found');
    }
    note.title = noteData.title;
    note.content = noteData.content;
    note.updatedAt = new Date(); 
    const updatedNote = await this.notesRepository.save(note);
    return updatedNote;
  }

  async remove(id: string): Promise<void> {
    await this.notesRepository.delete(id);
  }
}
