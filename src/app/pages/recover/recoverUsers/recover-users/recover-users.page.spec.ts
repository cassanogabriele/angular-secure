import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverUsersPage } from './recover-users.page';

describe('RecoverUsersPage', () => {
  let component: RecoverUsersPage;
  let fixture: ComponentFixture<RecoverUsersPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverUsersPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverUsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
