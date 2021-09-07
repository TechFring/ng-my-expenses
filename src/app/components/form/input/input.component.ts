import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { ICurrencyOptions } from 'src/app/models/currency.model';
import { fadeInOut } from 'src/app/animations';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  animations: [fadeInOut],
})
export class InputComponent implements OnInit {
  @Input() control: FormControl;
  @Input() type: string;
  @Input() label: string;

  public currencyOptions: Partial<ICurrencyOptions>;

  constructor() {
    this.currencyOptions = { align: 'left' };
  }

  ngOnInit(): void {}
}
