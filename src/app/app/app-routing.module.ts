import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { HomeComponent } from '../home/home.component'
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component'
import { LoginComponent } from '../user/login/login.component'
import { RegisterComponent } from '../user/register/register.component'

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
