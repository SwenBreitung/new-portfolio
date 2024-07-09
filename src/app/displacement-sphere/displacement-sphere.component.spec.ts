import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplacementSphereComponent } from './displacement-sphere.component';

describe('DisplacementSphereComponent', () => {
  let component: DisplacementSphereComponent;
  let fixture: ComponentFixture<DisplacementSphereComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplacementSphereComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplacementSphereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
