import { Component, output, Signal, OnInit, input, ChangeDetectionStrategy } from '@angular/core';
import { POI } from '../../../../data/model/poi.dto';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { Observable } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';
@Component({
  selector: 'app-poi-list',
  imports: [ReactiveFormsModule, MatFormField, MatInput, MatCard, MatLabel, ScrollingModule],
  templateUrl: './poi-list.component.html',
  styleUrl: './poi-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PoiListComponent implements OnInit {
  readonly pois = input.required<POI[]>();

  readonly search = output<Observable<string | null>>();
  readonly selectPoi = output<number>();

  readonly searchControl = new FormControl('');

  ngOnInit() {
    this.search.emit(this.searchControl.valueChanges);
  }
}
