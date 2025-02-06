import { Component, inject, output, Signal, OnInit } from '@angular/core';
import { PoisPageComponent } from '../../pois-page.component';
import { POI } from '../../../../data/model/poi.dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poi-list',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatCard, MatLabel],
  templateUrl: './poi-list.component.html',
  styleUrl: './poi-list.component.scss'
})
export class PoiListComponent implements OnInit {
  readonly pois: Signal<POI[]> = inject(PoisPageComponent).pois;

  readonly search = output<Observable<string | null>>();
  readonly selectPoi = output<number>();

  readonly searchControl = new FormControl('');

  ngOnInit() {
    this.search.emit(this.searchControl.valueChanges);
  }
}
