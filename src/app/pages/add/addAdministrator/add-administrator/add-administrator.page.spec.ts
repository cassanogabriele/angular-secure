import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdministratorPage } from './add-administrator.page';

describe('AddAdministratorPage', () => {
  let component: AddAdministratorPage;
  let fixture: ComponentFixture<AddAdministratorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdministratorPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAdministratorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
