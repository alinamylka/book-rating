import {Component, signal} from '@angular/core';
import {Book} from '../shared/book';
import {
  form,
  FormField,
  max,
  maxLength,
  min,
  minLength,
  provideSignalFormsConfig,
  required
} from '@angular/forms/signals';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-book-create-page',
  imports: [
    FormField,
    JsonPipe
  ],
  templateUrl: './book-create-page.html',
  styleUrl: './book-create-page.scss',
  providers: [provideSignalFormsConfig({
    classes: {
      invalid : (formField) => formField.state().invalid() && formField.state().touched()
    }
  })]
})
export class BookCreatePage {
  protected readonly bookFormData = signal<Book>(
    {
      isbn: '',
      title: '',
      description: '',
      authors: [],
      rating: 0,
      price: 0,
    }
  );
  protected readonly bookForm = form(this.bookFormData, path => {
    {
      required(path.isbn, {message: 'ISBN is required.'});
      minLength(path.isbn, 13, {message: 'ISBN must be 13 characters.'});
      maxLength(path.isbn, 13, {message: 'ISBN must be 13 characters.'});
      required(path.title, {message: "Title is required."});
      required(path.rating, {message: "Rating is required."});
      min(path.rating, 1, {message: "Rating must be at least 1."});
      max(path.rating, 5, {message: "Rating must be at most 5."});
      required(path.price, {message: "Price is required."});
      min(path.price, 0.01, {message: "Price is must be a positive integer."});
    }
  });

  constructor() {

  }
}
