import {Component, computed, debounced, inject, signal} from '@angular/core';
import {BookStore} from '../shared/book-store';
import {form, FormField} from '@angular/forms/signals';
import {toObservable, toSignal} from '@angular/core/rxjs-interop';
import {debounceTime, distinctUntilChanged, filter, switchMap} from 'rxjs';
import {bookRoutes} from '../books.routes';

@Component({
  selector: 'app-book-search-page',
  imports: [
    FormField
  ],
  templateUrl: './book-search-page.html',
  styleUrl: './book-search-page.scss',
})
export class BookSearchPage {
  readonly bookStore = inject(BookStore)
  protected readonly searchTerm = signal('')
  protected readonly debouncedSearchTerm = debounced(this.searchTerm, 500)
  protected readonly searchForm = form(this.searchTerm)
  readonly validTerm = computed(() => {
      let searchTerm = this.debouncedSearchTerm.value();
      return (searchTerm.length >= 3) ? searchTerm : undefined
    }
  )

  readonly searchResults = this.bookStore.searchBookResource(this.validTerm)


  /*
    protected readonly searchResults = toSignal(
      toObservable(this.searchTerm).pipe(
        filter(term => term.length >= 3),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(searchTerm => this.bookStore.searchBook(searchTerm))
      ), {'initialValue': []}
    )*/
}
