import {Component, signal, ChangeDetectionStrategy, inject} from '@angular/core';
import {Book} from '../shared/book';
import {BookCard} from '../book-card/book-card';
import {BookRatingHelper} from '../shared/book-rating-helper';
import {BookStore} from '../shared/book-store';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    BookCard
  ],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  protected readonly books = signal<Book[]>([]);
  readonly #helper: BookRatingHelper = inject(BookRatingHelper);
  readonly #bookStore: BookStore = inject(BookStore);

  constructor() {
    this.#bookStore.getAll().subscribe(books => this.books.set(books));
  }

  doRateDown(book: Book) {
    const ratedBook = this.#helper.rateDown(book)
    this.#updateBooks(ratedBook)
  }

  #updateBooks(book: Book) {
    this.books.update(books => books.map(b => b.isbn === book.isbn ? book : b));
  }

  doRateUp(book: Book) {
    const ratedBook = this.#helper.rateUp(book)
    this.#updateBooks(ratedBook)
  }

  protected isRatingUpDisabled(book: Book) {
    return this.#helper.isRatingUpDisabled(book)
  }
  protected isRatingDownDisabled(book: Book) {
    return this.#helper.isRatingDownDisabled(book)
  }
}
