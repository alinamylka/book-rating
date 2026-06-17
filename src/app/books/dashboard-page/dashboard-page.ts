import {Component, signal, ChangeDetectionStrategy} from '@angular/core';
import {Book} from '../shared/book';
import {BookCard} from '../book-card/book-card';

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

  constructor() {
    this.books.set([
      {
        isbn: '978-0-261-10333-4',
        title: 'The Hobbit',
        description: 'A fantasy adventure about Bilbo Baggins and his unexpected journey.',
        authors: ['J.R.R. Tolkien'],
        price: 12.99,
        rating: 5,
      },
      {
        isbn: '978-0-452-28423-4',
        title: '1984',
        description: 'A dystopian novel about surveillance, control, and totalitarianism.',
        authors: ['George Orwell'],
        price: 10.99,
        rating: 5,
      },
      {
        isbn: '978-0-06-112008-4',
        title: 'To Kill a Mockingbird',
        description: 'A novel about justice, morality, and racism in the American South.',
        authors: ['Harper Lee'],
        price: 11.99,
        rating: 4,
      },
      {
        isbn: '978-0-441-17271-9',
        title: 'Dune',
        description: 'An epic science fiction story of politics, prophecy, and survival on Arrakis.',
        authors: ['Frank Herbert'],
        price: 14.99,
        rating: 5,
      },
    ]);
  }

  protected doRateDown(book: Book) {
    console.log(book.isbn);
  }

  protected doRateUp(book: Book) {
    console.log(book.isbn);
  }
}
