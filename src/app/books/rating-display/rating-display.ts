import {Component, computed, input} from '@angular/core';

@Component({
  selector: 'app-rating-display',
  imports: [],
  templateUrl: './rating-display.html',
  styleUrl: './rating-display.scss',
})
export class RatingDisplay {
  readonly value = input.required<number>();
  protected readonly range = computed(() =>
    Array.from({length: this.value()}, (_, i) => i+1));
}
