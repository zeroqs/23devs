import { inject } from '@angular/core'
import { CanActivateFn, Router } from '@angular/router'

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const userJson = localStorage.getItem('user')
  const currentUser = userJson !== null ? JSON.parse(userJson) : false
  if (currentUser) {
    return true
  }
  return router.navigate(['/register'])
}
