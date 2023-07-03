import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit, OnDestroy {

  summonerName: string;
  region: string;

  private paramsSub: Subscription;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe({
      next: params => {
        this.summonerName = params['name'];
        this.region = params['region'];
      }
    })
  }

  ngOnDestroy(): void {
    this.paramsSub?.unsubscribe();
  }

}
