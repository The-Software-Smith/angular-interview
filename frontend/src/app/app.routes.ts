import { Routes } from '@angular/router';
import { PoisPageComponent } from '../feature/pois/pois-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/pois',
    pathMatch: 'full',
  },
  {
    path: 'pois',
    component: PoisPageComponent,
  },
];
