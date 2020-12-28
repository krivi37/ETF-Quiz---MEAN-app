import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IgradanaComponent } from './igradana.component';

describe('IgradanaComponent', () => {
  let component: IgradanaComponent;
  let fixture: ComponentFixture<IgradanaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IgradanaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IgradanaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
