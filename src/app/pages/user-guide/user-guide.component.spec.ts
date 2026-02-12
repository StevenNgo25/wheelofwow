import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserGuideComponent } from './user-guide.component';
import { TranslationService } from '../../services/translation.service';

describe('UserGuideComponent', () => {
  let component: UserGuideComponent;
  let fixture: ComponentFixture<UserGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserGuideComponent],
      providers: [TranslationService]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
