import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { Topic } from './entities/topic.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), UsersModule],
  controllers: [TopicsController],
  providers: [TopicsService],
  exports: [TopicsService]
})
export class TopicsModule {}
