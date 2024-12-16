import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAdministratorsPage } from './list-administrators-page.page';

describe('ListAdministratorsPagePage', () => {
  let component: ListAdministratorsPage;
  let fixture: ComponentFixture<ListAdministratorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAdministratorsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListAdministratorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
