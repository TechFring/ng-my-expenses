import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { CurrencyOptions } from 'src/app/models/currency';
import { fadeInOut } from 'src/app/animations';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [fadeInOut]
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() type: string;
  @Input() label: string;

  public currencyOptions: Partial<CurrencyOptions>;
  public isInvalid: boolean;

  constructor(
    public formService: FormService
  ) {
    this.currencyOptions = { align: 'left' };
  }

  ngOnInit(): void {}
}
