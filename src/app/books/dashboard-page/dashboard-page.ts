import {Component, ChangeDetectionStrategy, inject, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookCard} from '../book-card/book-card';
import {BookRatingHelper} from '../shared/book-rating-helper';
import {BookStore} from '../shared/book-store';
import {interval, Subscription, timer} from 'rxjs';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard-page',
  imports: [
    BookCard,
    DatePipe
  ],
  templateUrl: './dashboard-page.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './dashboard-page.scss',
})
export class DashboardPage {
  readonly #bookStore: BookStore = inject(BookStore);
  readonly #helper: BookRatingHelper = inject(BookRatingHelper);
  readonly currentTime  = signal<Date>(new Date());
  #timerSubscription!: Subscription;
  protected readonly books = this.#bookStore.booksResource

  ngOnInit() {
    this.#timerSubscription = interval(1000).subscribe(() => {
      this.currentTime.set(new Date());
    })
  }

  ngOnDestroy() {
    this.#timerSubscription.unsubscribe();
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

  protected reload() {
    this.books.reload()
  }


  protected doDelete(book: Book) {
    const confirmed = window.confirm(`Are you sure you want to delete the book "${book.title}"?`);
    if (confirmed) {
      this.#bookStore.delete(book.isbn).subscribe({
        next: () => {
          this.books.update(books => books.filter(b => b.isbn !== book.isbn));
        },
        error: (err) => {
          console.error(`Failed to delete book with ISBN ${book.isbn}:`, err);
        }
      });
    }
  }
}
