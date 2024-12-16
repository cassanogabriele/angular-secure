import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientPage } from './add-client.page';

describe('AddClientPage', () => {
  let component: AddClientPage;
  let fixture: ComponentFixture<AddClientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddClientPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
