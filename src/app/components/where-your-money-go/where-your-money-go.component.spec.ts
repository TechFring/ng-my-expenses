import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhereYourMoneyGoComponent } from './where-your-money-go.component';

describe('WhereYourMoneyGoComponent', () => {
  let component: WhereYourMoneyGoComponent;
  let fixture: ComponentFixture<WhereYourMoneyGoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhereYourMoneyGoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhereYourMoneyGoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
