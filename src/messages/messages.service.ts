import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private messagesRepository: Repository<Message>,
  ) {}

  create(createMessageDto: CreateMessageDto): Promise<Message> {
    const message = this.messagesRepository.create(createMessageDto);
    return this.messagesRepository.save(message);
  }

  findAll(): Promise<Message[]> {
    return this.messagesRepository.find({ 
      relations: ['user', 'zone', 'topic'] 
    });
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messagesRepository.findOne({ 
      where: { id },
      relations: ['user', 'zone', 'topic'],
    });
    
    if (!message) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
    return message;
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.findOne(id);
    this.messagesRepository.merge(message, updateMessageDto);
    return this.messagesRepository.save(message);
  }

  async remove(id: number): Promise<void> {
    const result = await this.messagesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Message with ID ${id} not found`);
    }
  }
  
  findByTopic(topicId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { topicId },
      relations: ['user', 'zone', 'topic'],
    });
  }
  
  findByZone(zoneId: number): Promise<Message[]> {
    return this.messagesRepository.find({
      where: { zoneId },
      relations: ['user', 'zone', 'topic'],
    });
  }
} 