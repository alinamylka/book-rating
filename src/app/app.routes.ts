import {Routes} from '@angular/router';
import {bookRoutes} from './books/books.routes';
import {ErrorPage} from './error-page/error-page';

export const routes: Routes = [
  {path: '', redirectTo: 'books', pathMatch: 'full'},
  ...bookRoutes,
  {path: "**", component: ErrorPage}
];
