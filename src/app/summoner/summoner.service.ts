import { Injectable } from "@angular/core";
import { RiotService } from "../shared/riot.service";
import { NGXLogger } from "ngx-logger";
import { BehaviorSubject } from "rxjs";
import { SummonerResponse } from "../shared/model/summoner.model";

@Injectable({ providedIn: 'root'})
export class SummonerService {

  summonerSubject = new BehaviorSubject<SummonerResponse>(null);
  summoner$ = this.summonerSubject.asObservable();

  constructor(
    private riot: RiotService,
    private logger: NGXLogger
  ) {}

}

