import { NgIf } from '@angular/common'
import { Component } from '@angular/core'
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    NgIf,
  ],
})
export class LoginComponent {
  hideFirst = true
  loginForm: FormGroup

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator() as ValidatorFn,
      ]),
    })
  }

  passwordStrengthValidator() {
    return (control: FormControl) => {
      const password = control.value
      const hasNumber = /\d/.test(password)
      const hasUpper = /[A-Z]/.test(password)
      const hasLower = /[a-z]/.test(password)
      const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
      const valid = hasNumber && hasUpper && hasLower && hasSpecial
      return valid ? null : { invalidPassword: true }
    }
  }

  login() {
    localStorage.setItem('user', JSON.stringify(this.loginForm.value))
    this.router.navigate(['/'])
  }
}
