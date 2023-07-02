import { Component, OnInit } from '@angular/core';
import { RiotService } from '../shared/riot.service';
import { SummonerDTO } from '../shared/model/summoner.model';
import { mergeMap, switchMap } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private riot: RiotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    const apiKey = localStorage.getItem('api_key');
    if(apiKey) {
      this.riot.apiKey = apiKey;
      this.logger.debug('Api key loaded from localStorage');
    }
  }

  enterPressed(name: string) {
    if(!name) {
      return;
    }
    this.logger.debug('Entered summoner name:', name);
    this.router.navigate(['summoner', 'eun1', name]);
  }

  setApiKey(key: string) {
    this.riot.apiKey = key;
    localStorage.setItem('api_key', key);
    this.logger.debug('Api key loaded.');
  }

}
