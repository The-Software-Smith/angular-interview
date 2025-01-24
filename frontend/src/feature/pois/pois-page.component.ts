import { Component } from "@angular/core";
import { MapViewComponent } from "../../shared/map-view/map-view.component";

@Component({
  selector: 'app-pois-page',
  templateUrl: './pois-page.component.html',
  styleUrls: ['./pois-page.component.scss'],
  imports: [MapViewComponent],
})
export class PoisPageComponent {}
