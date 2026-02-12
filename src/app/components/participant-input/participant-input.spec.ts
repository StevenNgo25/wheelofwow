import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantInput } from './participant-input';

describe('ParticipantInput', () => {
  let component: ParticipantInput;
  let fixture: ComponentFixture<ParticipantInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticipantInput]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
