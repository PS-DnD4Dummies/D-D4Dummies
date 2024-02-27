import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLoaderPopupComponent } from './character-loader-popup.component';

describe('CharacterLoaderPopupComponent', () => {
  let component: CharacterLoaderPopupComponent;
  let fixture: ComponentFixture<CharacterLoaderPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterLoaderPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterLoaderPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
