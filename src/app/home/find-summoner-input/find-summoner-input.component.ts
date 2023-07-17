import { AfterViewInit, Component, ElementRef, HostBinding, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('inputContainer') inputContainer: ElementRef<HTMLDivElement>;
  @ViewChild('dropdownContainer') dropdownContainer: ElementRef<HTMLDivElement>;

  dropdownOpen = false;

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

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    // Prevent site from scrolling when dropdown is open
    if (this.dropdownOpen && (event.key === 'ArrowUp' || event.key === 'ArrowDown')) {
      event.preventDefault();
    }
  }

  @HostListener('document:click', ['$event']) 
  onClick(event: MouseEvent) {
    if(!this.inputContainer.nativeElement.contains(event.target as Node)) { 
      this.dropdownOpen = false;
      return;
    }
    this.dropdownOpen = true;
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
    setTimeout(() => this.dropdownOpen = false, 50);
    this.findSummoner();
  }

  inputOnArrowPress(arrow: string) {
    const focused = document.activeElement;
    if(focused === this.nameInput.nativeElement) {
      (this.dropdownContainer.nativeElement.firstChild as HTMLElement).focus();
      return;
    }
    if(!this.dropdownContainer.nativeElement.contains(focused)) {
      return;
    }
    if(arrow === 'down' && (focused.nextSibling as HTMLElement).classList?.contains('dropdown-item')) {
      (focused.nextSibling as HTMLElement).focus();
    }
    if(arrow === 'up' && focused.previousSibling !== null) {
      (focused.previousSibling as HTMLElement).focus();
    }
  }

  findSummoner() {
    this.dropdownOpen = false;
    if(!this.nameInput.nativeElement.value) {
      return;
    }
    this.router.navigate([
      'summoner',
      this.regionSelect.nativeElement.value,
      this.nameInput.nativeElement.value,
      'match-history'
    ]);
    this.nameInput.nativeElement.value = "";
    this.nameInput.nativeElement.blur();
  }

}
