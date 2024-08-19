import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoEcoComponent } from './demo-eco.component';

describe('DemoEcoComponent', () => {
  let component: DemoEcoComponent;
  let fixture: ComponentFixture<DemoEcoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DemoEcoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemoEcoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
