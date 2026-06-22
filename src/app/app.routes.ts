import {Routes} from '@angular/router';
import {ErrorPage} from './error-page/error-page';

export const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.bookRoutes)
  },
  {path: 'error', component: ErrorPage},
  {path: "**", component: ErrorPage}
];
