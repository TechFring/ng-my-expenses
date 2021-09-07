import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';
import { UtilsService } from 'src/app/services/utils.service';
import { IExpense } from 'src/app/models/expense.model';
import { ICategory } from 'src/app/models/category.model';
import { ICurrencyOptions } from 'src/app/models/currency.model';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit {
  public currencyOptions: Partial<ICurrencyOptions>;
  public formGroup: FormGroup;
  public isEdit: boolean;
  public categories: ICategory[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _expenseService: ExpenseService,
    private _categoryService: CategoryService,
    private _utilsService: UtilsService
  ) {
    const expenseId = this._route.snapshot.paramMap.get('id');

    this.currencyOptions = { align: 'left' };
    this.isEdit = expenseId != null;

    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      category: new FormControl('', [Validators.required]),
      datetime: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', []),
    });

    this._handleIsEdit(+expenseId);
    this._subscribers();
  }

  ngOnInit(): void {}

  private _subscribers(): void {
    this._subscribeCategories();
  }

  private _subscribeCategories(): void {
    this._categoryService.list().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _handleIsEdit(expenseId?: number): void {
    const format: string = 'yyyy-MM-ddTHH:mm';

    if (this.isEdit) {
      this._expenseService.retrieve(expenseId).subscribe((expense) => {
        const datetime = this._utilsService.formatDate(
          expense.datetime,
          format
        );
        const category = expense.category.id;
        this.formGroup.patchValue({ ...expense, datetime, category });
      });
    } else {
      const currDatetime = new Date().toISOString();
      const datetime = this._utilsService.formatDate(
        currDatetime,
        format,
        false
      );
      this.formGroup.patchValue({ datetime: datetime });
    }
  }

  public onSubmit(): void {
    this.formGroup.markAllAsTouched();

    if (this.formGroup.valid) {
      this.formGroup.patchValue({
        description: this.formGroup.value['description'].trim(),
      });

      const expense: IExpense = this.formGroup.getRawValue();

      if (this.isEdit) {
        this._expenseService.update(expense).subscribe(
          () => {},
          () => alert('An unexpected error has occurred'),
          () => this._router.navigate(['expenses'])
        );
      } else {
        this._expenseService.create(expense).subscribe(
          () => {},
          () => alert('An unexpected error has occurred'),
          () => this._router.navigate(['expenses'])
        );
      }
    }
  }

  public onDelete(): void {
    const confirmed: boolean = confirm('Confirm deletion');

    if (confirmed) {
      const expenseId: number = this.formGroup.value['id'];

      this._expenseService.destroy(expenseId).subscribe(
        () => {},
        () => alert('An unexpected error has occurred'),
        () => this._router.navigate(['expenses'])
      );
    }
  }
}
