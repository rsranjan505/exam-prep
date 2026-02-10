import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinTest } from './join-test';

describe('JoinTest', () => {
  let component: JoinTest;
  let fixture: ComponentFixture<JoinTest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinTest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinTest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
