import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeDemoTestComponent } from './free-demo-test.component';

describe('FreeDemoTestComponent', () => {
  let component: FreeDemoTestComponent;
  let fixture: ComponentFixture<FreeDemoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FreeDemoTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeDemoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
