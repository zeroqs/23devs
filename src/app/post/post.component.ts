import { Component, Input } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatDialog, MatDialogModule } from '@angular/material/dialog'
import { MatDividerModule } from '@angular/material/divider'

import { DeleteComponent } from '../modals/delete/delete.component'
import { EditComponent } from '../modals/edit/edit.component'
import { PostDto } from './dto'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
  standalone: true,
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatDialogModule],
})
export class PostComponent {
  constructor(public dialog: MatDialog) {}

  @Input() post!: PostDto

  openDialogDelete(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(DeleteComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: this.post.title, id: this.post.id },
    })
  }

  openDialogEdit(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
  ): void {
    this.dialog.open(EditComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: { title: this.post.title, id: this.post.id, body: this.post.body },
    })
  }
}
