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

  apiKeyValid = false;

  private subs: Subscription[] = [];

  constructor(
    private logger: NGXLogger,
    private riot: RiotService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.subs.push(this.riot.apiKeyValid$.subscribe({
      next: valid => {
        this.apiKeyValid = valid;
      }
    }));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  enterPressed(name: string) {
    if(!name) {
      return;
    }
    this.logger.debug('Entered summoner name:', name);
    this.router.navigate(['summoner', 'eun1', name]);
  }

  setApiKey(key: string) {
    this.subs.push(this.riot.setApiKey(key).subscribe());
  }

}
