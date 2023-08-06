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
import { MatNativeDateModule } from '@angular/material/core'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { Router } from '@angular/router'

import { UserService } from '../user.service'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgIf,
  ],
})
export class RegisterComponent {
  hideFirst = true
  hideSecond = true
  date = new FormControl(new Date())
  registrationForm: FormGroup

  constructor(
    private UserService: UserService,
    private router: Router,
  ) {
    this.registrationForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
        Validators.maxLength(50),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[A-Za-z]+$/),
        Validators.maxLength(50),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator() as ValidatorFn,
      ]),
      confirmPassword: new FormControl('', [Validators.required]),
      dateOfBirth: new FormControl('', [
        Validators.required,
        this.ageValidator as ValidatorFn,
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

  ageValidator(control: FormControl) {
    const dateOfBirth = control.value
    if (dateOfBirth) {
      const today = new Date()
      const birthDate = new Date(dateOfBirth)
      const age = today.getFullYear() - birthDate.getFullYear()
      if (age < 18) {
        return { underAge: true }
      }
    }
    return null
  }

  registerUser() {
    const newUser = this.registrationForm.value
    this.UserService.create(newUser).subscribe(() =>
      this.router.navigate(['/login']),
    )
  }
}
