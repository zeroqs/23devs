import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppComponent } from './app/app/app.component'
import { AppRoutingModule } from './app/app/app-routing.module'
import { HomeComponent } from './app/home/home.component'
import { CreateComponent } from './app/modals/create/create.component'
import { DeleteComponent } from './app/modals/delete/delete.component'
import { EditComponent } from './app/modals/edit/edit.component'
import { PageNotFoundComponent } from './app/page-not-found/page-not-found.component'
import { PaginatorComponent } from './app/paginator/paginator.component'
import { PostComponent } from './app/post/post.component'
import { LoginComponent } from './app/user/login/login.component'
import { RegisterComponent } from './app/user/register/register.component'

@NgModule({
  declarations: [AppComponent, HomeComponent, PageNotFoundComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PostComponent,
    PaginatorComponent,
    BrowserAnimationsModule,
    DeleteComponent,
    EditComponent,
    CreateComponent,
    RegisterComponent,
    LoginComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
