import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ICategory } from '../../models/category.model';
import { MainService } from '../../services/main.service';
import { CategoryDeleteComponent } from '../category-delete/category-delete.component';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnChanges {
  @Input() category!: ICategory;
  @Input() rerenderCategories!: () => void;
  viewMode: boolean = true;

  categoryForm = new FormGroup({
    title: new FormControl({ value: '', disabled: !this.viewMode }, [
      Validators.required
    ])
  });

  constructor(
    private mainService: MainService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['category']) {
      this.categoryForm.get('title')?.setValue(this.category.title);
    }
  }

  onToggleMode() {
    this.viewMode = !this.viewMode;
  }

  updateCategory() {
    this.mainService
      .updateCategory(this.category.category_id, this.categoryForm.value)
      .subscribe({
        next: () => {
          this.onToggleMode();
        },
        error: (err) => {
          this.snackBar.open(err.error.message, 'OK', {
            duration: 2000
          });
        },
        complete: () => {
          this.snackBar.open('Category deleted successfully', 'OK', {
            duration: 2000,
            verticalPosition: 'top'
          });
        }
      });
  }

  deleteCategory() {
    this.mainService.deleteCategory(this.category.category_id).subscribe({
      next: () => {
        this.rerenderCategories();
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'OK', {
          duration: 2000
        });
      },
      complete: () => {
        this.snackBar.open('Category deleted successfully', 'OK', {
          duration: 2000,
          verticalPosition: 'top'
        });
      }
    });
  }
  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.data = {
      categoryIdx: this.category.category_id,
      deleteCategory: () => this.deleteCategory()
    };
    this.dialog.open(CategoryDeleteComponent, dialogConfig);
  }
}
