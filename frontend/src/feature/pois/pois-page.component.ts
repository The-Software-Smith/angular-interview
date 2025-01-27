import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  MapViewComponent,
  Marker,
} from '../../shared/map-view/map-view.component';
import { PoiService } from '../../data/api/poi.service';
import { POI } from '../../data/model/poi.dto';
import { PoiListComponent } from './ui/poi-list/poi-list.component';

@Component({
  selector: 'app-pois-page',
  templateUrl: './pois-page.component.html',
  styleUrls: ['./pois-page.component.scss'],
  imports: [MapViewComponent, PoiListComponent],
})
export class PoisPageComponent implements OnInit {
  readonly poiService = inject(PoiService);

  pois: WritableSignal<POI[]> = signal([]);

  selectedPoi: WritableSignal<POI | null> = signal(null);

  readonly selectedPoiLatLng: Signal<[number, number] | undefined> = computed(() => {
    const poi = this.selectedPoi();
    if (!poi) return undefined;

    return [poi.longitude, poi.latitude];
  });

  readonly markers = computed(() =>
    this.pois().map<Marker>((poi) => ({
      id: poi.id,
      lngLat: [poi.longitude, poi.latitude],
    }))
  );

  ngOnInit() {
    this.poiService.getPois().subscribe((pois) => {
      this.pois.set(pois);
      this.selectedPoi.set(pois[0]);
    });
  }

  searchPois(query: string) {
    if (!query) {
      this.poiService.getPois().subscribe((pois) => this.pois.set(pois));
    }
    if (query.length >= 2) {
      this.poiService
        .searchPois({ q: query })
        .subscribe((pois) => this.pois.set(pois));
    }
  }

  selectPoi(poiId: number) {
    this.selectedPoi.set(this.pois().find((poi) => poi.id === poiId) ?? null);
  }
}
