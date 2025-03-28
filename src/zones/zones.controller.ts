import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from '@nestjs/common';
import { ZonesService } from './zones.service';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Controller('zones')
export class ZonesController {
  constructor(private readonly zonesService: ZonesService) {}

  @Post()
  create(@Body() createZoneDto: CreateZoneDto): Promise<Zone> {
    return this.zonesService.create(createZoneDto);
  }

  @Get()
  findAll(): Promise<Zone[]> {
    return this.zonesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Zone> {
    return this.zonesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateZoneDto: UpdateZoneDto
  ): Promise<Zone> {
    return this.zonesService.update(+id, updateZoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.zonesService.remove(+id);
  }
}
