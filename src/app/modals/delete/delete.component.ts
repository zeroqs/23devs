import { NgIf } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { PostDto } from '../../post/dto'
import { PostService } from '../../post/post.service'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, MatProgressSpinnerModule, NgIf],
})
export class DeleteComponent implements OnInit {
  text: string
  id: number
  page: number
  posts: PostDto[] = []

  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    private PostService: PostService,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; id: number },
  ) {}

  ngOnInit(): void {
    this.text = this.data.title
    this.id = this.data.id
    this.PostService.paginator$.subscribe(
      (paginator) => (this.page = paginator.pageIndex),
    )
    this.PostService.posts$.subscribe((data) => (this.posts = data))
  }

  onDelete() {
    this.PostService.delete(this.id).subscribe(() => {
      this.dialogRef.close(true)
      this.PostService.updatePosts(
        this.posts.filter((post) => post.id !== this.id),
      )
    })
  }
}
