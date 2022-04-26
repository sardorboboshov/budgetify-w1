import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-category-delete',
  templateUrl: './category-delete.component.html',
  styleUrls: [
    './category-delete.component.scss',
    '../../transactions/transaction-delete/transaction-delete.component.scss'
  ]
})
export class CategoryDeleteComponent {
  constructor(
    private dialogRef: MatDialogRef<CategoryDeleteComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      deleteCategory: () => void;
    }
  ) {}

  deleteCategory() {
    this.data.deleteCategory();
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
