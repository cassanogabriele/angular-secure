import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRoleUserPage } from './edit-role-user.page';

describe('EditRoleUserPage', () => {
  let component: EditRoleUserPage;
  let fixture: ComponentFixture<EditRoleUserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRoleUserPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditRoleUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
