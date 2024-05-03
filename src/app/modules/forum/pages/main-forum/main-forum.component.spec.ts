import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainForumComponent } from './main-forum.component';

describe('MainForumComponent', () => {
  let component: MainForumComponent;
  let fixture: ComponentFixture<MainForumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainForumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainForumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
