import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { fadeInOut } from 'src/app/animations';
import { ICategory } from 'src/app/models/category.model';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [fadeInOut],
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: ICategory[];

  constructor() {}

  ngOnInit(): void {}
}
