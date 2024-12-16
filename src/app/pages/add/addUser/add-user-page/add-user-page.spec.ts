import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserPage } from './add-user-page.page';

describe('AddUserPagePage', () => {
  let component: AddUserPage;
  let fixture: ComponentFixture<AddUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
