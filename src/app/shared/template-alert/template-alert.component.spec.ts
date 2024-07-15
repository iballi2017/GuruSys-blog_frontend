import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplateAlertComponent } from './template-alert.component';

describe('TemplateAlertComponent', () => {
  let component: TemplateAlertComponent;
  let fixture: ComponentFixture<TemplateAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateAlertComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemplateAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
