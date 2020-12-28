import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegRequestsComponent } from './reg-requests.component';

describe('RegRequestsComponent', () => {
  let component: RegRequestsComponent;
  let fixture: ComponentFixture<RegRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
