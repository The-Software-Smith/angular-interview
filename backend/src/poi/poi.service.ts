import { Injectable, NotFoundException } from '@nestjs/common';
import { POI } from '../interfaces/poi.interface';
import { POIS } from '../mock/pois.mock';

@Injectable()
export class PoiService {
  private pois: POI[] = POIS;

  findAll(): POI[] {
    return this.pois;
  }

  findById(id: number): POI {
    const poi = this.pois.find((poi) => poi.id === id);
    if (!poi) {
      throw new NotFoundException(`POI with ID ${id} not found`);
    }
    return poi;
  }

  search(term: string): POI[] {
    if (!term) {
      return this.pois;
    }
    const lowercaseTerm = term.toLowerCase();
    const results = this.pois.filter(
      (poi) =>
        poi.name.toLowerCase().includes(lowercaseTerm) ||
        poi.description?.toLowerCase().includes(lowercaseTerm),
    );
    return results;
  }

  findByCategory(category: string): POI[] {
    return this.pois.filter(
      (poi) => poi.category.toLowerCase() === category.toLowerCase(),
    );
  }
}
