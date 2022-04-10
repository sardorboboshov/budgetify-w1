import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthFormComponent } from './auth/auth-form/auth-form.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { CategoryComponent } from './main/category/category.component';
import { AuthGuard } from './auth/auth.guard';
import { AuthorizedGuard } from './auth/authorized.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: AuthFormComponent,
    canActivate: [AuthorizedGuard]
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then((m) => m.MainModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
