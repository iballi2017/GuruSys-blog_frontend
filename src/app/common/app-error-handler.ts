import { ErrorHandler } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    console.error('Error: ', error);
    throw new Error('An unexpected error occurred.');
  }
}
