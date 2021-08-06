import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-anonymous',
  templateUrl: './anonymous.component.html',
  styleUrls: ['./anonymous.component.scss']
})
export class AnonymousComponent implements OnInit {

  constructor() {
    console.log("AQUIII 2")
  }

  ngOnInit(): void {
  }

}
