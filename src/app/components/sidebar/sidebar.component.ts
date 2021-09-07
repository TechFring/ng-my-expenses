import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  public user: IUser;

  @ViewChild('sidebar') elSidebar: ElementRef;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this._subscribers();
  }

  private _subscribers(): void {
    this._subscribeUser();
  }

  private _subscribeUser(): void {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }

  public onClickBtnToggle(): void {
    const nativeElement = this.elSidebar.nativeElement;
    nativeElement.classList.toggle('show');
  }
}
