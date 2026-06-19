import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardPage} from './dashboard-page';
import {BookRatingHelper} from '../shared/book-rating-helper';
import {Book} from '../shared/book';
import {Mock} from 'vitest';
import {BookStore} from '../shared/book-store';
import {of} from 'rxjs';
import {resource} from '@angular/core';

describe('DashboardPage', () => {
  let component: DashboardPage;
  let fixture: ComponentFixture<DashboardPage>;
  let rateUp: Mock;

  beforeEach(async () => {
    rateUp = vi.fn();
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
      providers: [
        {
          provide: BookRatingHelper, useValue: {rateUp: rateUp, rateDown: vi.fn()}
        },
        {
          provide: BookStore, useFactory: () => {
            return {
              getAll: of(),
              booksResource: resource({loader: () => Promise.resolve([])})
            }
          }
        }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call service.rateUp for doRateUp()', () => {
    const testBook = {isbn: '324', rating: 4} as Book;
    rateUp.mockReturnValue(testBook);
    component.doRateUp(testBook);
    expect(rateUp).toHaveBeenCalledExactlyOnceWith(testBook)
  })
});
