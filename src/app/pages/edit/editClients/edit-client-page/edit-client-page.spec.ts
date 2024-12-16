import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditClientPage } from './edit-client-page.page';

describe('EditClientPagePage', () => {
  let component: EditClientPage;
  let fixture: ComponentFixture<EditClientPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditClientPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditClientPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
