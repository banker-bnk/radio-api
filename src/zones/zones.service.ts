import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Zone } from './entities/zone.entity';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';

@Injectable()
export class ZonesService {
  constructor(
    @InjectRepository(Zone)
    private zonesRepository: Repository<Zone>,
  ) {}

  create(createZoneDto: CreateZoneDto): Promise<Zone> {
    const zone = this.zonesRepository.create(createZoneDto);
    return this.zonesRepository.save(zone);
  }

  findAll(): Promise<Zone[]> {
    return this.zonesRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Zone> {
    const zone = await this.zonesRepository.findOne({ 
      where: { id },
      relations: ['user'],
    });
    
    if (!zone) {
      throw new NotFoundException(`Zone with ID ${id} not found`);
    }
    return zone;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto): Promise<Zone> {
    const zone = await this.findOne(id);
    this.zonesRepository.merge(zone, updateZoneDto);
    return this.zonesRepository.save(zone);
  }

  async remove(id: number): Promise<void> {
    const result = await this.zonesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Zone with ID ${id} not found`);
    }
  }
} 