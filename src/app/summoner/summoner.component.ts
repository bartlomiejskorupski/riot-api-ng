import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';
import { RiotService } from '../shared/riot.service';
import { SummonerDTO } from '../shared/model/summoner.model';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit, OnDestroy {

  summoner: SummonerDTO;
  region: string;

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
    console.log(this);
    
    this.region = params['region'];
    this.riot.getSummoner(this.region, params['name']).subscribe({
      next: summoner => {
        this.summoner = summoner;
      },
      error: _ => { this.summoner = null }
    });
  }

}
