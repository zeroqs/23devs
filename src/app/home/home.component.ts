import { Component, HostListener, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

import { CreateComponent } from '../modals/create/create.component'
import { PostDto } from '../post/dto'
import { PostService } from '../post/post.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  posts: PostDto[] = []

  constructor(
    private PostService: PostService,
    public dialog: MatDialog,
  ) {}

  page = 0

  ngOnInit(): void {
    this.PostService.startDataUpdate()
    this.PostService.paginator$.subscribe((paginator) => {
      this.page = paginator.pageIndex
      this.PostService.getAll(this.page + 1, 10).subscribe((data) => {
        this.posts = data
        this.PostService.updatePosts(data)
      })
    })
    this.PostService.posts$.subscribe((data) => (this.posts = data))
  }

  @HostListener('window:blur', ['$event'])
  onBlur(): void {
    this.PostService.stopDataUpdate()
  }

  @HostListener('window:focus', ['$event'])
  onFocus(): void {
    this.PostService.startDataUpdate()
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(CreateComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    })
  }
}
