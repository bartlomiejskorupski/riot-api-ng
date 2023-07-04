import { Component, OnDestroy, OnInit } from '@angular/core';
import { RiotService } from '../shared/riot.service';
import { SummonerDTO } from '../shared/model/summoner.model';
import { Subscription, mergeMap, switchMap } from 'rxjs';
import { NGXLogger } from 'ngx-logger';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  constructor(
    private logger: NGXLogger,
    private router: Router
  ) { }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
  }

  enterPressed(name: string) {
    if(!name) {
      return;
    }
    this.logger.debug('Entered summoner name:', name);
    this.router.navigate(['summoner', 'eun1', name]);
  }


}
