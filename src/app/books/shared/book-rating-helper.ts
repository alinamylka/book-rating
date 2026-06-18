import {Book} from './book';
import {Service} from '@angular/core';

@Service()
export class BookRatingHelper {
  rateUp(book: Book) {
    if (book.rating >= 5) {
      return book;
    }
    return {
      ...book,
      rating: book.rating + 1,
    }
  }

  rateDown(book: Book) {
    return {
      ...book,
      rating: Math.max(1, book.rating - 1),
    }
  }
}
