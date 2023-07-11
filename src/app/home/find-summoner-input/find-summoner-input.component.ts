import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription, debounceTime, fromEvent, map, mergeMap, take } from 'rxjs';
import { RiotService } from 'src/app/shared/riot.service';

@Component({
  selector: 'app-find-summoner-input',
  templateUrl: './find-summoner-input.component.html',
  styleUrls: ['./find-summoner-input.component.css']
})
export class FindSummonerInputComponent implements OnInit, AfterViewInit {

  regions = {
    "EUNE": 'eun1',
    "EUW": 'euw1',
    "NA": 'na1',
    "BR": 'br1',
    "JP": 'jp1',
    "KR": 'kr',
    "LAN": 'la1',
    "LAS": 'la2',
    "OCE": 'oc1',
    "TR": 'tr1',
    "RU": 'ru',
    "PH": ' PH2',
    "SG": 'sg2',
    "TH": 'th2',
    "TW": 'tw2',
    "VN": 'vn2',
  }

  regionNames = Object.keys(this.regions);

  @ViewChild("summonerInput") nameInput: ElementRef<HTMLInputElement>;
  @ViewChild("regionSelect") regionSelect: ElementRef<HTMLSelectElement>;
  private sub: Subscription;

  nameSuggestions: String[] = [];
  isInputFocused = false;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private riot: RiotService
  ) { }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.updateNameSuggestions();

    this.sub = fromEvent(this.nameInput.nativeElement, 'keyup')
      .pipe(
        debounceTime(500)
      ).subscribe({
        next: _ => this.updateNameSuggestions()
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  updateNameSuggestions() {
    const region = this.regionSelect.nativeElement.value;
    const name = this.nameInput.nativeElement.value;
    this.riot.getNamesStartingWith(region, name)
      .pipe(take(1))
      .subscribe({
        next: names => {
          this.nameSuggestions = names;
          this.logger.debug('Updating suggestions');
        }
      })
  }

  onRegionChange() {
    this.updateNameSuggestions();
  }

  dropdownItemClicked(name: string) {
    this.nameInput.nativeElement.value = name;
    this.findSummoner();
  }

  onInputFocus() {
    this.isInputFocused = true;
  }

  onInputBlur() {
    setTimeout(
      () => this.isInputFocused = false,
      100
    );
  }

  findSummoner() {
    // this.logger.debug(
    //   this.regionSelect.nativeElement.value,
    //   this.nameInput.nativeElement.value
    // );
    if(!this.nameInput.nativeElement.value) {
      return;
    }
    this.router.navigate([
      'summoner',
      this.regionSelect.nativeElement.value,
      this.nameInput.nativeElement.value
    ]);
    this.nameInput.nativeElement.value = "";
    this.nameInput.nativeElement.blur();
  }

}
