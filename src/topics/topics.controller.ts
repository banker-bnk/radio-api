import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Body() createTopicDto: CreateTopicDto, @Req() req): Promise<Topic> {
    return this.topicsService.create(createTopicDto, req.user.sub);
  }

  @Get()
  findAll(): Promise<Topic[]> {
    return this.topicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Topic> {
    return this.topicsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTopicDto: UpdateTopicDto
  ): Promise<Topic> {
    return this.topicsService.update(+id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.topicsService.remove(+id);
  }
}
