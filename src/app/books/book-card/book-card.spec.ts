import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCard } from './book-card';
import {inputBinding} from '@angular/core';

describe('BookCard', () => {
  let component: BookCard;
  let fixture: ComponentFixture<BookCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookCard, {
      bindings: [
        inputBinding('book', () => ({
          isbn: '978-0-06-112008-4',
          title: 'To Kill a Mockingbird',
          description: 'A novel about justice, morality, and racism in the American South.',
          authors: ['Harper Lee'],
          price: 11.99,
          rating: 4,
        }))
      ]
    });
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
