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
    this.riot.apiKey = localStorage.getItem('api_key');
  }

  setApiKey(key: string) {
    this.riot.apiKey = key;
    localStorage.setItem('api_key', key);
  }

  getSummoner(name: string) {
    this.riot.getSummoner(name, 'eun1')
      .pipe(
        switchMap(summoner => {
          this.logger.debug(summoner.puuid);
          return this.riot.getMatches(summoner.puuid);
        }),
        mergeMap(matchIds => matchIds),
        mergeMap(matchId => {
          this.logger.debug(matchId);
          return this.riot.getMatch(matchId);
        })
      ).subscribe({
        next: matche => {
          this.logger.debug(matche);
        },
        error: error => {
          this.logger.error(error);
        }
      });
  }



}
