import { Component, OnInit } from '@angular/core';
import { MainService } from '../services/main.service';
import { ICategory } from '../models/category.model';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categories$: Observable<ICategory[]> = new Observable<[]>();
  constructor(private mainService: MainService) {}

  ngOnInit(): void {
    this.mainService.getAllCategories().pipe((res) => (this.categories$ = res));
  }
}
