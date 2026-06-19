import {Routes} from '@angular/router';
import {BooksDetails} from './books-details/books-details';
import {DashboardPage} from './dashboard-page/dashboard-page';

export const bookRoutes: Routes = [
  {path: 'books', component: DashboardPage},
  {path: 'books/:isbn', component: BooksDetails}
];
