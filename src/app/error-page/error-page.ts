import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-error-page',
  imports: [RouterLink],
  templateUrl: './error-page.html',
  styleUrl: './error-page.scss',
})
export class ErrorPage {
  protected readonly error = history.state?.error ?? null;
  protected readonly errorMessage = this.formatError(this.error);

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    if (typeof error === 'string') {
      return error;
    }

    if (error && typeof error === 'object') {
      try {
        return JSON.stringify(error, null, 2);
      } catch {
        return 'An unknown error occurred.';
      }
    }

    return 'An unknown error occurred.';
  }

}
