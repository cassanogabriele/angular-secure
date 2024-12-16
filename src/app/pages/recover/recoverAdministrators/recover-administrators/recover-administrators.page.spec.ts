import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverAdministratorsPage } from './recover-administrators.page';

describe('RecoverAdministratorsPage', () => {
  let component: RecoverAdministratorsPage;
  let fixture: ComponentFixture<RecoverAdministratorsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverAdministratorsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverAdministratorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
