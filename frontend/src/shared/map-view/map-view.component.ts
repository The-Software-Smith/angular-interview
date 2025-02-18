import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { MapComponent, MarkerComponent } from '@maplibre/ngx-maplibre-gl';
import { LngLatLike } from 'maplibre-gl';

export type Marker = {
  id: number;
  lngLat: [number, number];
}

const middleOfUsa: [number, number] = [-74.5, 40];

@Component({
  selector: 'app-map-view',
  imports: [MapComponent, MarkerComponent],
  templateUrl: './map-view.component.html',
  styleUrl: './map-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MapViewComponent {
  readonly center = input<LngLatLike | undefined>(middleOfUsa);
  readonly markers = input<Array<Marker>>();
}
