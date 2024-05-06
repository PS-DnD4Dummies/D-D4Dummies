import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumPopupComponent } from './premium-popup.component';

describe('PremiumPopupComponent', () => {
  let component: PremiumPopupComponent;
  let fixture: ComponentFixture<PremiumPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremiumPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
