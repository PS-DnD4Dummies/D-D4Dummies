import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveGlossaryComponent } from './descriptive-glossary.component';

describe('DescriptiveGlossaryComponent', () => {
  let component: DescriptiveGlossaryComponent;
  let fixture: ComponentFixture<DescriptiveGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptiveGlossaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptiveGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
