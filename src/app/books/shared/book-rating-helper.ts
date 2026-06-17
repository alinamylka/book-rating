import {Book} from './book';
import {Service} from '@angular/core';

@Service()
export class BookRatingHelper {
  rateUp(book: Book) {
    return book;
  }
  rateDown(book: Book) {
    return book;
  }
}
