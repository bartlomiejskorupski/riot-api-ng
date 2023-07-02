import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

@Component({
  selector: 'app-summoner',
  templateUrl: './summoner.component.html',
  styleUrls: ['./summoner.component.css']
})
export class SummonerComponent implements OnInit {

  summonerName: string;
  region: string;

  constructor(
    private logger: NGXLogger,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: params => {
        this.summonerName = params['name'];
        this.region = params['region'];
      }
    })
  }

}
