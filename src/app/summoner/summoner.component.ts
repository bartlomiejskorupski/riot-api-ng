import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { RiotService } from '../shared/riot.service';
import { SummonerResponse } from '../shared/model/summoner.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit, OnDestroy {

  summoner: SummonerResponse;
  iconPath: string;
  region: string;
  revisionDate: Date

  private paramsSub: Subscription;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute,
    private riot: RiotService
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe({ next: this.queryParamsChange });
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

  queryParamsChange = (params: Params) => {
    this.region = params['region'];
    this.riot.getSummoner(this.region, params['name']).subscribe({
      next: summoner => {
        this.summoner = summoner;
        this.logger.debug(summoner);
        this.iconPath = environment.apiUrl + summoner.profileIconPath;
      },
      error: _ => {
        this.summoner = null;
      }
    });
  }

}
