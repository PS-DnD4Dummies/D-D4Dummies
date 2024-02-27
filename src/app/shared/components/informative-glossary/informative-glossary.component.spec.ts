import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformativeGlossaryComponent } from './informative-glossary.component';

describe('InformativeGlossaryComponent', () => {
  let component: InformativeGlossaryComponent;
  let fixture: ComponentFixture<InformativeGlossaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformativeGlossaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InformativeGlossaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
