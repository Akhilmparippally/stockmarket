import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { DetailsComponent } from './details/details.component';
import { AuthGuard } from './Interceptor/authGuard';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '',   component: SearchComponent},
 { path: 'home',   component: SearchComponent},
 { path: 'add',   component: AddComponent, canActivate: [AuthGuard]},
 {path: 'login', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }