import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImmobilierComponants } from './immobilier.component';

describe('ClassementComponent', () => {
  let component: ImmobilierComponants;
  let fixture: ComponentFixture<ImmobilierComponants>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImmobilierComponants ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImmobilierComponants);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
