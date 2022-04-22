import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ICategory } from '../../models/category.model';
import { MainService } from '../../services/main.service';
import {
  FormControl,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
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

  constructor(private mainService: MainService) {}

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
      .updateCategory(this.category.category_id, {
        title: this.categoryForm.value.title
      })
      .subscribe(() => {
        this.onToggleMode();
      });
  }
  deleteCategory() {
    this.mainService.deleteCategory(this.category.category_id).subscribe(() => {
      this.rerenderCategories();
    });
  }
}
