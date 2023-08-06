import { JsonPipe } from '@angular/common'
import { Component } from '@angular/core'
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator'

import { PostService } from '../post/post.service'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css'],
  standalone: true,
  imports: [MatPaginatorModule, JsonPipe],
})
export class PaginatorComponent {
  constructor(private PostService: PostService) {}

  length = 100
  pageSize = 10
  pageIndex = 0

  handlePageEvent(e: PageEvent) {
    this.PostService.updatePaginator(e)
  }
}
