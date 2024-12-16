import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListUsersPagePage } from './list-users-page';

describe('ListUsersPagePage', () => {
  let component: ListUsersPagePage;
  let fixture: ComponentFixture<ListUsersPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListUsersPagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListUsersPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
