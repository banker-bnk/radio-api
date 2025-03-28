import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Topic } from './entities/topic.entity';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private topicsRepository: Repository<Topic>,
    private usersService: UsersService
  ) {}

  async create(
    createTopicDto: CreateTopicDto,
    userSub: string
  ): Promise<Topic> {
    const user = await this.usersService.findBySub(userSub);
    const topic = this.topicsRepository.create({
      ...createTopicDto,
      userId: user.id,
      user
    });
    return this.topicsRepository.save(topic);
  }

  findAll(): Promise<Topic[]> {
    return this.topicsRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Topic> {
    const topic = await this.topicsRepository.findOne({
      where: { id },
      relations: ['user']
    });

    if (!topic) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
    return topic;
  }

  async update(id: number, updateTopicDto: UpdateTopicDto): Promise<Topic> {
    const topic = await this.findOne(id);
    this.topicsRepository.merge(topic, updateTopicDto);
    return this.topicsRepository.save(topic);
  }

  async remove(id: number): Promise<void> {
    const result = await this.topicsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Topic with ID ${id} not found`);
    }
  }
}
