import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportCsvButtonComponent } from './export-csv-button.component';

describe('ExportCsvButtonComponent', () => {
  let component: ExportCsvButtonComponent;
  let fixture: ComponentFixture<ExportCsvButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportCsvButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExportCsvButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
