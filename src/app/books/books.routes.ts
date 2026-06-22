import {Routes} from '@angular/router';
import {BooksDetails} from './books-details/books-details';
import {DashboardPage} from './dashboard-page/dashboard-page';
import {BookCreatePage} from './book-create-page/book-create-page';
import {BookSearchPage} from './book-search-page/book-search-page';

export const bookRoutes: Routes = [
  {path: '', component: DashboardPage, title: 'Books'},
  {path: 'create', component: BookCreatePage, title: 'Create Book'},
  {path: 'search', component: BookSearchPage, title: 'Search Books'},
  {path: ':isbn', component: BooksDetails, title: 'Book Details'},
];
