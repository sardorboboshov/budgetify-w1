import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CategoriesComponent } from './categories/categories.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizedGuard } from './auth/authorized.guard';
import { MainPageComponent } from './main/main-page/main-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthFormComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: CategoriesComponent
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    component: MainPageComponent,
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
