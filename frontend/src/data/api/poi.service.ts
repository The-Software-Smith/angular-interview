import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { POI } from '../model/poi.dto';
import { Observable } from 'rxjs';
import { SearchPoiDto } from '../model/search-poi.dto';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoiService {
  private readonly apiUrl = environment.apiUrl + '/pois';

  constructor(private http: HttpClient) {}

  getPois(): Observable<POI[]> {
    return this.http.get<POI[]>(this.apiUrl);
  }

  getPoi(id: number): Observable<POI> {
    return this.http.get<POI>(`${this.apiUrl}/${id}`);
  }

  searchPois(query: SearchPoiDto): Observable<POI[]> {
    return this.http.get<POI[]>(`${this.apiUrl}/search`, { params: query });
  }

  getPoisByCategory(category: string): Observable<POI[]> {
    return this.http.get<POI[]>(`${this.apiUrl}/category/${category}`);
  }
}
