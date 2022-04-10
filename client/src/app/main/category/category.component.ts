import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ICategory } from '../models/category.model';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories: ICategory[] = [];
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getAllCategories().subscribe((data: any) => {
      this.categories = data.categories;
    });
  }
}
