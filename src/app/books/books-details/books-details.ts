import {Component, inject, input} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
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

  route = inject(ActivatedRoute);
  bs = inject(BookStore);

/*  readonly bookX = this.route.paramMap.pipe(
    map(params => params.get('isbn')),
    filter(param => param !== null),
    map(isbn => this.bs.getSingle(isbn))
  )*/
}
