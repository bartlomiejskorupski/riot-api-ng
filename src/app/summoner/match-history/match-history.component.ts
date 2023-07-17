import { Component, OnDestroy, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { SummonerResponse } from 'src/app/shared/model/summoner.model';
import { RiotService } from 'src/app/shared/riot.service';

@Component({
  selector: 'app-match-history',
  templateUrl: './match-history.component.html',
  styleUrls: ['./match-history.component.css']
})
export class MatchHistoryComponent implements OnInit, OnDestroy {

  private summonerSub: Subscription;

  constructor(
    private logger: NGXLogger,
    private riot: RiotService
  ) { }

  ngOnInit(): void {
    this.summonerSub = this.riot.summoner$.subscribe({
      next: this.summonerLoaded,
      error: this.summonerError
    });
  }

  ngOnDestroy(): void {
    this.summonerSub?.unsubscribe();
  }

  summonerLoaded = (summoner: SummonerResponse) => {
    // TODO
  }

  summonerError = (error) => {
    this.logger.debug(error);
  }

}
