import { Controller, Get, Param, Query, ValidationPipe } from '@nestjs/common';
import { PoiService } from './poi.service';
import { POI } from '../interfaces/poi.interface';
import { SearchPoiDto } from './dto/search-poi.dto';

@Controller('api/pois')
export class PoiController {
  constructor(private readonly poiService: PoiService) {}

  @Get()
  findAll(): POI[] {
    return this.poiService.findAll();
  }

  @Get('search')
  search(@Query(ValidationPipe) query: SearchPoiDto): POI[] {
    return this.poiService.search(query.q);
  }

  @Get('category/:category')
  findByCategory(@Param('category') category: string): POI[] {
    return this.poiService.findByCategory(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string): POI {
    return this.poiService.findById(Number(id));
  }
}
