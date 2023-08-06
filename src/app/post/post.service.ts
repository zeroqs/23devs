import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { PageEvent } from '@angular/material/paginator'
import {
  BehaviorSubject,
  delay,
  interval,
  Observable,
  of,
  retry,
  takeWhile,
  throwError,
} from 'rxjs'
import { catchError } from 'rxjs/operators'

import { PostDto } from './dto'

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private alive = true
  private updateInterval = 2 * 60 * 1000 // 2 minutes

  constructor(
    private http: HttpClient,
    public dialog: MatDialog,
  ) {}

  private postsSubject = new BehaviorSubject<PostDto[]>([])
  private paginatorSubject = new BehaviorSubject<PageEvent>({
    length: 0,
    pageSize: 10,
    pageIndex: 0,
    previousPageIndex: 0,
  })

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

  private getObjectById(id: number): PostDto | undefined {
    return this.postsSubject.getValue().find((obj) => obj.id === id)
  }

  posts$: Observable<PostDto[]> = this.postsSubject.asObservable()
  baseUrl = 'https://jsonplaceholder.typicode.com/posts'
  paginator$ = this.paginatorSubject.asObservable()

  updatePaginator(paginator: PageEvent): void {
    this.paginatorSubject.next(paginator)
  }

  updatePosts(posts: PostDto[]) {
    this.postsSubject.next(posts)
  }

  getAll(page: number, limit: number): Observable<PostDto[]> {
    return this.http
      .get<PostDto[]>(this.baseUrl, {
        params: new HttpParams({
          fromObject: { _page: page, _limit: limit },
        }),
      })
      .pipe(retry(3), catchError(this.handleError))
  }

  delete(id: number) {
    const url = `${this.baseUrl}/${id}`
    return of(null)
      .pipe(delay(1000)) // Имитация задержки на сервере перед удалением
      .pipe(() => this.http.delete(url), catchError(this.handleError))
  }

  update(id: number, updatedObject: Omit<PostDto, 'id' | 'userId'>) {
    const url = `${this.baseUrl}/${id}`
    const objects = this.postsSubject.getValue()
    const index = objects.findIndex((obj) => obj.id === id)
    const oldObject = this.getObjectById(id)
    if (index !== -1 && oldObject) {
      const newObject = { ...oldObject, ...updatedObject }
      return of(null)
        .pipe(delay(1000)) // Имитация задержки на сервере перед удалением
        .pipe(() => this.http.put(url, newObject), catchError(this.handleError))
        .subscribe(() => {
          objects[index] = newObject
          this.updatePosts(objects)
          this.dialog.closeAll()
        })
    }
    return throwError(
      () => new Error('Something bad happened; please try again later.'),
    )
  }

  create(newObject: Omit<PostDto, 'id'>) {
    console.log(newObject)
    const url = `${this.baseUrl}`
    const objects = this.postsSubject.getValue()
    return of(null)
      .pipe(delay(1000)) // Имитация задержки на сервере перед удалением
      .pipe(() => this.http.post(url, newObject), catchError(this.handleError))
      .subscribe((res) => {
        const resObj = res as PostDto
        console.log(resObj)
        objects.push(resObj)
        this.updatePosts(objects)
        this.dialog.closeAll()
      })
  }

  startDataUpdate(): void {
    interval(this.updateInterval)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => {
        this.getAll(this.paginatorSubject.getValue().pageIndex, 10).subscribe(
          (data) => {
            this.updatePosts(data)
          },
        )
      })
  }

  stopDataUpdate(): void {
    this.alive = false
  }
}
