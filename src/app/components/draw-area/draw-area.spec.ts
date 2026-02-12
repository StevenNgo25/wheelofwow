import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawArea } from './draw-area';

describe('DrawArea', () => {
  let component: DrawArea;
  let fixture: ComponentFixture<DrawArea>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawArea]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DrawArea);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
