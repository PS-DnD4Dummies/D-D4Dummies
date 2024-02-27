import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptiveGlossaryElementComponent } from './descriptive-glossary-element.component';

describe('DescriptiveGlossaryElementComponent', () => {
  let component: DescriptiveGlossaryElementComponent;
  let fixture: ComponentFixture<DescriptiveGlossaryElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DescriptiveGlossaryElementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DescriptiveGlossaryElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
