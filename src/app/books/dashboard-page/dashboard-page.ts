import {ChangeDetectionStrategy, Component, DestroyRef, inject, signal} from '@angular/core';
import {Book} from '../shared/book';
import {BookCard} from '../book-card/book-card';
import {BookRatingHelper} from '../shared/book-rating-helper';
import {BookStore} from '../shared/book-store';
import {interval, map} from 'rxjs';
import {DatePipe} from '@angular/common';
import {takeUntilDestroyed, toSignal} from '@angular/core/rxjs-interop';

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
  readonly #destroyRef = inject(DestroyRef);
  readonly currentTime = signal<Date>(new Date());
  readonly currentTimeWithSignal = toSignal(
    interval(1000).pipe(
      map(() => new Date()),
      takeUntilDestroyed(this.#destroyRef)
    ),
    {initialValue: new Date()}
  );
  readonly interval = setInterval(() => {
    console.log(`tick: ${new Date()}`);
    this.currentTime.set(new Date())
  }, 1000);

  constructor() {
    this.#destroyRef.onDestroy(() => clearInterval(this.interval));
  }


  protected readonly books = this.#bookStore.booksResource

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
