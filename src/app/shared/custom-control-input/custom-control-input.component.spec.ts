import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomControlInputComponent } from './custom-control-input.component';

describe('CustomControlInputComponent', () => {
  let component: CustomControlInputComponent;
  let fixture: ComponentFixture<CustomControlInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomControlInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomControlInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
