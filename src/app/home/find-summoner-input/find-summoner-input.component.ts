import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-find-summoner-input',
  templateUrl: './find-summoner-input.component.html',
  styleUrls: ['./find-summoner-input.component.css']
})
export class FindSummonerInputComponent implements OnInit, OnDestroy {

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

  constructor(
    private logger: NGXLogger,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    
  }

  findSummoner(regionSelect: HTMLSelectElement, nameInput: HTMLInputElement) {
    this.logger.debug(regionSelect.value, nameInput.value);
    if(!nameInput.value) {
      return;
    }
    this.router.navigate(['summoner', regionSelect.value, nameInput.value]);
    nameInput.value = "";
  }

}
