import {Routes} from '@angular/router';
import {ErrorPage} from './error-page/error-page';
import {HomePage} from './home-page/home-page';

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomePage, title: 'Home Page'},
  {
    path: 'books',
    loadChildren: () => import('./books/books.routes').then(m => m.bookRoutes)
  },
  {path: 'error', component: ErrorPage},
  {path: "**", component: ErrorPage}
];
