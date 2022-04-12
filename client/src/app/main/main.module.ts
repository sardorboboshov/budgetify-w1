import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPageComponent } from './main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { LayoutModule } from '../layout/layout.module';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [MainPageComponent],
  imports: [CommonModule, LayoutModule, SharedModule]
})
export class MainModule {}
