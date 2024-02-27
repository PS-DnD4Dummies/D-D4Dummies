import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoreSectionComponent } from './lore-section.component';

describe('LoreSectionComponent', () => {
  let component: LoreSectionComponent;
  let fixture: ComponentFixture<LoreSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoreSectionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoreSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
