import { Component, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MainService } from '../../services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  constructor(
    private dialogRef: MatDialogRef<AddCategoryComponent>,
    private mainService: MainService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: { rerenderCategories: any }
  ) {}
  chosenType: string = 'expense';

  categoryForm = new FormGroup({
    title: new FormControl({ value: '', disabled: false }, [
      Validators.required
    ]),
    type: new FormControl({ value: 'expense', disabled: false }, [
      Validators.required,
      Validators.maxLength(32)
    ])
  });
  onNoClick(): void {
    this.dialogRef.close();
  }
  setType(type: string) {
    this.chosenType = type;
    this.categoryForm.get('type')?.setValue(type);
  }
  save() {
    this.mainService.createCategory(this.categoryForm.value).subscribe({
      next: () => {
        this.dialogRef.close();
        this.data.rerenderCategories();
      },
      error: (err) => {
        this.dialogRef.close();
        this.snackBar.open('Such category already exists', 'OK', {
          duration: 1600,
          verticalPosition: 'top'
        });
      },
      complete: () => {
        this.snackBar.open('Category created successfully', 'OK', {
          duration: 1600,
          verticalPosition: 'top'
        });
      }
    });
  }
}
