import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { delay, of, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'

import { IRegister } from './dto/register'

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error)
    } else {
      console.error(
        `Backend returned code ${error.status}, body was:`,
        error.error,
      )
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    )
  }

  baseUrl = 'https://jsonplaceholder.typicode.com/users'

  create(newUser: IRegister) {
    return of(null)
      .pipe(delay(1000)) // Имитация задержки на сервере перед удалением
      .pipe(
        () => this.http.post(this.baseUrl, newUser),
        catchError(this.handleError),
      )
  }
}
