import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameofthedayComponent } from './gameoftheday.component';

describe('GameofthedayComponent', () => {
  let component: GameofthedayComponent;
  let fixture: ComponentFixture<GameofthedayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameofthedayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameofthedayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
