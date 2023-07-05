import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindSummonerInputComponent } from './find-summoner-input.component';

describe('FindSummonerInputComponent', () => {
  let component: FindSummonerInputComponent;
  let fixture: ComponentFixture<FindSummonerInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindSummonerInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindSummonerInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
