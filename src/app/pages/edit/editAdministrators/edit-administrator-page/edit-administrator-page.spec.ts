import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAdministratorPagePage } from './edit-administrator-page';

describe('EditAdministratorPagePage', () => {
  let component: EditAdministratorPagePage;
  let fixture: ComponentFixture<EditAdministratorPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditAdministratorPagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAdministratorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
