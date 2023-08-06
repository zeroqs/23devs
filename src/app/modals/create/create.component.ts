import { NgIf } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'

import { PostService } from '../../post/post.service'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
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
export class CreateComponent implements OnInit {
  title: string
  id: number
  body: string
  form: FormGroup

  constructor(private PostService: PostService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      body: new FormControl('', Validators.required),
    })
  }

  get titleMessage() {
    return this.form.get('title')
  }

  get bodyMessage() {
    return this.form.get('body')
  }

  onSubmit() {
    const randomUserId = Math.floor(Math.random() * (10 - 1) + 1)
    const newPost = this.form.value
    this.PostService.create({
      ...newPost,
      userId: randomUserId,
    })
  }
}
