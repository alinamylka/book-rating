import {inject, Service} from '@angular/core';
import {HttpClient, httpResource, HttpResourceRef} from '@angular/common/http';
import {Book} from './book';

@Service()
export class BookStore {
  #http = inject(HttpClient);
  #apiUrl = 'https://api.angular.schule';

  readonly booksResource = this.#getAllResource()

  getAll = () => {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books`)
  }

  #getAllResource(): HttpResourceRef<Book[]> {
    return httpResource(() => `${this.#apiUrl}/books`, {defaultValue: []})
  }

  getSingle = (isbn: number) => {
    return this.#http.get<Book>(`${this.#apiUrl}/books/${isbn}`)
  }

  getSingleResource(isbn: () => string) {
    return httpResource<Book>(() => `${this.#apiUrl}/books/${isbn()}`)
  }

  delete(isbn: string) {
    return this.#http.delete<Book>(`${this.#apiUrl}/books/${isbn}`)
  }
  create = (book: Book) => {
    return this.#http.post<Book>(`${this.#apiUrl}/book`, book)
  }
  searchBook = (searchTerm: string) => {
    return this.#http.get<Book[]>(`${this.#apiUrl}/books/search/${searchTerm}`)
  }
}
