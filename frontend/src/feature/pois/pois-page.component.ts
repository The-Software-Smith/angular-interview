import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
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
import { catchError, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-pois-page',
  templateUrl: './pois-page.component.html',
  styleUrls: ['./pois-page.component.scss'],
  imports: [MapViewComponent, PoiListComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoisPageComponent implements OnInit {
  readonly poiService = inject(PoiService);
  readonly destroyRef = inject(DestroyRef);

  pois: WritableSignal<POI[]> = signal<POI[]>([]);

  selectedPoi: WritableSignal<POI | null> = signal(null);

  readonly selectedPoiLatLng: Signal<[number, number] | undefined> = computed(
    () => {
      const poi = this.selectedPoi();
      if (!poi) return undefined;

      return [poi.longitude, poi.latitude];
    }
  );

  readonly markers = computed(() =>
    this.pois().map<Marker>((poi) => ({
      id: poi.id,
      lngLat: [poi.longitude, poi.latitude],
    }))
  );

  ngOnInit() {
    this.poiService
      .getPois()
      .pipe(
        tap((pois) => {
          this.pois.set(pois);
          this.selectedPoi.set(pois[0]);
        }),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe();
  }

  searchPois(query: Observable<string | null>) {
    query.pipe(
      takeUntilDestroyed(this.destroyRef),
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((query) => {
        if (!query || query.length < 2) {
          return this.poiService.getPois()
          .pipe(
            catchError(() => of([]))
          );
        } 
        return this.poiService.searchPois({ q: query })
        .pipe(
          catchError(() => of([]))
        );
      }),
      tap((pois) => this.pois.set(pois)),
    ).subscribe();
  }

  selectPoi(poiId: number) {
    this.selectedPoi.set(this.pois().find((poi) => poi.id === poiId) ?? null);
  }
}

