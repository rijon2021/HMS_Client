import { HttpErrorResponse } from "@angular/common/http";
import { ErrorHandler, Injectable } from "@angular/core";


@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor() { }

  handleError(error: any): void {
    // check if it's an error from an HTTP response
    if (!(error instanceof HttpErrorResponse)) {
      error = error.rejection || error.stack || error.message;  // get the error object
    }

    console.error('Error from global error handler', error);
  }
}
