import { NgIf } from '@angular/common'
import { Component, Inject, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { PostDto } from '../../post/dto'
import { PostService } from '../../post/post.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class EditComponent implements OnInit {
  title: string
  id: number
  body: string
  form: FormGroup

  constructor(
    private PostService: PostService,
    public dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: Omit<PostDto, 'userId'>,
  ) {
    this.title = this.data.title
    this.id = this.data.id
    this.body = this.data.body
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.title, Validators.required),
      body: new FormControl(this.body, Validators.required),
    })
  }

  get titleMessage() {
    return this.form.get('title')
  }

  get bodyMessage() {
    return this.form.get('body')
  }

  onEdit() {
    if (this.form.valid) {
      const result = this.form.value
      this.PostService.update(this.id, result)
    }
  }
}
