import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionCardFeatureComponent } from './section-card-feature.component';

describe('SectionCardFeatureComponent', () => {
  let component: SectionCardFeatureComponent;
  let fixture: ComponentFixture<SectionCardFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionCardFeatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionCardFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
