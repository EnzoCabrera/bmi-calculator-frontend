import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietsCardComponent } from './diets-card.component';

describe('DietsCardComponent', () => {
  let component: DietsCardComponent;
  let fixture: ComponentFixture<DietsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DietsCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
