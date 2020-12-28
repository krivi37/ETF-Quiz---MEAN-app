import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MojbrojComponent } from './mojbroj.component';

describe('MojbrojComponent', () => {
  let component: MojbrojComponent;
  let fixture: ComponentFixture<MojbrojComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MojbrojComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MojbrojComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
