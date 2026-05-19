import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeZoneComponent } from './practice-zone.component';

describe('PracticeZoneComponent', () => {
  let component: PracticeZoneComponent;
  let fixture: ComponentFixture<PracticeZoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PracticeZoneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PracticeZoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
