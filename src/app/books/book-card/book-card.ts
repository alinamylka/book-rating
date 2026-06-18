import {Component, computed, input, output, ChangeDetectionStrategy} from '@angular/core';
import {Book} from '../shared/book';
import {RatingDisplay} from '../rating-display/rating-display';

@Component({
  selector: 'app-book-card',
  imports: [
    RatingDisplay
  ],
  templateUrl: './book-card.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './book-card.scss',
})
export class BookCard {
  readonly book = input.required<Book>();
  readonly authors = computed(() => this.book().authors.join(', '));
  readonly rateUp = output<Book>()
  readonly rateDown = output<Book>()

  protected doRateDown() {
    this.rateDown.emit(this.book());
  }

  protected doRateUp() {
    this.rateUp.emit(this.book());
  }
}
