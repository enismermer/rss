import { Routes } from '@angular/router';
import { ActualitesComponent } from './pages/actualites/actualites.component';

export const routes: Routes = [
//   { path: '', redirectTo: 'asie-pacifique', pathMatch: 'full' },
  { path: 'actualites/:region', component: ActualitesComponent }
];
