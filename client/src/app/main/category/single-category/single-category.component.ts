import { Component, Input } from '@angular/core';
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
export class SingleCategoryComponent {
  @Input() category!: ICategory;
  viewMode: boolean = true;

  categoryForm = new FormGroup({
    title: new FormControl({ value: '', disabled: !this.viewMode }, [
      Validators.required
    ])
  });

  constructor(private mainService: MainService) {}
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
}
