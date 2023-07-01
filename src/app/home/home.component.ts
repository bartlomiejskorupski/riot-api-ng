import { Component, OnInit } from '@angular/core';
import { RiotService } from '../shared/riot.service';
import { SummonerDTO } from '../shared/model/summoner.model';
import { mergeMap, switchMap } from 'rxjs';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private logger: NGXLogger,
    private riot: RiotService
  ) { }

  ngOnInit(): void {
    const apiKey = localStorage.getItem('api_key');
    if(apiKey) {
      this.riot.apiKey = apiKey;
      this.logger.debug('Api key loaded from localStorage');
    }
  }

  setApiKey(key: string) {
    this.riot.apiKey = key;
    localStorage.setItem('api_key', key);
    this.logger.debug('Api key loaded.');
  }

  getSummoner(name: string) {
    this.riot.getSummoner(name).subscribe({
      next: summoner => {
        this.logger.debug(summoner);
      },
      error: err => {
        this.logger.error(err);
      }
    });
  }



}
