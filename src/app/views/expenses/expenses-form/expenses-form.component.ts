import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { TExpenseType } from 'src/app/models/expense';
import { ExpenseService } from 'src/app/services/expense.service';
import { UtilsService } from 'src/app/services/utils.service';
import { CurrencyOptions } from 'src/app/models/currency';

@Component({
  selector: 'app-expenses-form',
  templateUrl: './expenses-form.component.html',
  styleUrls: ['./expenses-form.component.scss'],
})
export class ExpensesFormComponent implements OnInit {
  public currencyOptions: Partial<CurrencyOptions>;
  public formGroup: FormGroup;
  public isEdit: boolean;
  public expenseTypes: TExpenseType[];

  constructor(
    private route: ActivatedRoute,
    private expenseService: ExpenseService,
    private utilsService: UtilsService
  ) {
    const expenseId = this.route.snapshot.paramMap.get('id');

    this.currencyOptions = { align: 'left' };
    this.isEdit = expenseId != null;

    this.formGroup = new FormGroup({
      id: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
      datetime: new FormControl('', [Validators.required]),
      value: new FormControl('', [Validators.required, Validators.min(0.01)]),
      description: new FormControl('', []),
    });

    this.handleIsEdit(+expenseId);
    this.observeExpenseTypes();
  }

  ngOnInit(): void {}

  // EVENTS
  public onSubmit(): void {
    if (this.formGroup.valid) {
      this.formGroup.patchValue({
        description: this.formGroup.value['description'].trim(),
      });
    }
  }

  private handleIsEdit(expenseId: number): void {
    if (this.isEdit) {
      const expense = this.expenseService.getExpenseById(expenseId);
      const datetime = this.utilsService.formatDatetime(expense.datetime);
      this.formGroup.patchValue({ ...expense, datetime });
    } else {
      const currDate = new Date().toISOString();
      const currDateFormatted = this.utilsService.formatDatetime(currDate);
      this.formGroup.patchValue({ datetime: currDateFormatted });
    }
  }

  private observeExpenseTypes(): void {
    this.expenseService.expenseTypes.subscribe((types) => {
      this.expenseTypes = types;
    });
  }
}
