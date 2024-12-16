import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmChallengeComponent } from './confirm-challenge.component';

describe('ConfirmChallengeComponent', () => {
  let component: ConfirmChallengeComponent;
  let fixture: ComponentFixture<ConfirmChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmChallengeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
