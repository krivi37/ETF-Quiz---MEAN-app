import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeografijaComponent } from './geografija.component';

describe('GeografijaComponent', () => {
  let component: GeografijaComponent;
  let fixture: ComponentFixture<GeografijaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeografijaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeografijaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
