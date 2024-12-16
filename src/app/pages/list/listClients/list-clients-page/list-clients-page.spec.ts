import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListModeratorsPagePage } from './list-clients.page';

describe('ListModeratorsPagePage', () => {
  let component: ListModeratorsPagePage;
  let fixture: ComponentFixture<ListModeratorsPagePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListModeratorsPagePage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListModeratorsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
