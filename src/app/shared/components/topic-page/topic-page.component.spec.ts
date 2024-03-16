import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicDisplayComponent } from './topic-page.component';

describe('TopicDisplayComponent', () => {
  let component: TopicDisplayComponent;
  let fixture: ComponentFixture<TopicDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopicDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopicDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
