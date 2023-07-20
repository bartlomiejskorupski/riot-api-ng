import { Component, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { Subscription, take } from 'rxjs';
import { ChampionMasteryResponse } from 'src/app/shared/model/champion-mastery.model';
import { SummonerResponse } from 'src/app/shared/model/summoner.model';
import { RiotService } from 'src/app/shared/riot.service';
import { SummonerService } from '../summoner.service';

@Component({
  selector: 'app-champion-mastery',
  templateUrl: './champion-mastery.component.html',
  styleUrls: ['./champion-mastery.component.css']
})
export class ChampionMasteryComponent implements OnInit {

  masteries: ChampionMasteryResponse[];

  private summonerSub: Subscription;

  constructor(
    private logger: NGXLogger,
    private riot: RiotService,
    private summonerService: SummonerService
  ) { }

  ngOnInit(): void {
    this.summonerSub = this.summonerService.summoner$.subscribe({
      next: this.nextSummoner
    });
  }

  ngOnDestroy(): void {
    this.summonerSub?.unsubscribe();
  }

  nextSummoner = (summoner: SummonerResponse) => {
    if(summoner) {
      this.loadMasteries(summoner);
    }
    else {
      this.logger.debug('Not found');
    }
  }

  loadMasteries(summoner: SummonerResponse) {
    this.logger.debug('Loading masteries');
    this.riot.getMasteries(summoner.region, summoner.puuid)
      .pipe(take(1))
      .subscribe({
        next: this.masteriesLoaded,
        error: this.masteriesError
      });
  }

  masteriesLoaded = (masteries: ChampionMasteryResponse[]) => {
    this.logger.debug(`Loaded ${masteries.length} masteries`);
    this.masteries = masteries;
  };

  masteriesError = (error) => {
    this.logger.debug('Error loading masteries:', error);
  };
  
}
