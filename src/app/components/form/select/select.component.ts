import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { fadeInOut } from 'src/app/animations';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  animations: [fadeInOut]
})
export class SelectComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;
  @Input() options: string[];

  constructor(
    public formService: FormService
  ) { }

  ngOnInit(): void {
  }

}
