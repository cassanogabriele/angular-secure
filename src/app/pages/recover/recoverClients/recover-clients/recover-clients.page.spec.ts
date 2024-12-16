import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverClientsPage } from './recover-clients.page';

describe('RecoverClientsPage', () => {
  let component: RecoverClientsPage;
  let fixture: ComponentFixture<RecoverClientsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecoverClientsPage ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecoverClientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
