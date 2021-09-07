import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

import { fadeInOut } from 'src/app/animations';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  animations: [fadeInOut],
})
export class TextareaComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;

  constructor() {}

  ngOnInit(): void {}
}
