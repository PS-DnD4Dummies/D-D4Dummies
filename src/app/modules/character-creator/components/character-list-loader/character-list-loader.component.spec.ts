import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterListLoaderComponent } from './character-list-loader.component';

describe('CharacterListLoaderComponent', () => {
  let component: CharacterListLoaderComponent;
  let fixture: ComponentFixture<CharacterListLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterListLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CharacterListLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
