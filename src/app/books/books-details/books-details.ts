import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {BookStore} from '../shared/book-store';
import {BookCard} from '../book-card/book-card';

@Component({
  selector: 'app-books-details',
  imports: [
    RouterLink,
    BookCard
  ],
  templateUrl: './books-details.html',
  styleUrl: './books-details.scss',
})
export class BooksDetails {
  readonly isbn = input.required<string>();
  readonly book = inject(BookStore).getSingleResource(this.isbn);
}
