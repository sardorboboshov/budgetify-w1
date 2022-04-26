import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MainService } from '../services/main.service';
import { ICategory } from '../models/category.model';
import { AddCategoryComponent } from './add-category/add-category.component';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  displayCategories: ICategory[] = [];
  typeSet: string = '';
  constructor(private mainService: MainService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  rerenderCategories = () => {
    this.getAllCategories();
  };
  getAllCategories() {
    this.mainService
      .getAllCategories()
      .subscribe(
        (res: ICategory[]) => (
          (this.categories = res), (this.displayCategories = res)
        )
      );
  }
  setCategoryType = (type: string) => {
    if (this.typeSet === type) {
      this.typeSet = '';
      this.displayCategories = this.categories;
    } else {
      this.typeSet = type;
      this.displayCategories = this.categories.filter(
        (category) => category.type === type
      );
    }
  };
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = '30vw';
    dialogConfig.height = '100vh';
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      rerenderCategories: () => this.getAllCategories()
    };
    dialogConfig.position = {
      top: '3.75rem',
      right: '0'
    };
    this.dialog.open(AddCategoryComponent, dialogConfig);
  }
}
