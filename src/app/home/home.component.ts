import { Component, OnInit } from '@angular/core';
import { RiotService } from '../shared/riot.service';
import { SummonerDTO } from '../shared/model/summoner.model';
import { flatMap, mergeMap, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private riot: RiotService) { }

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
          console.log(summoner.puuid);
          return this.riot.getMatches(summoner.puuid);
        }),
        mergeMap(matchIds => matchIds),
        mergeMap(matchId => {
          console.log(matchId);
          
          return this.riot.getMatch(matchId);
        })
      ).subscribe({
        next: matches => {
          console.log(matches);
          
        },
        error: error => {
          console.log(error);
          
        }
      });
  }



}
