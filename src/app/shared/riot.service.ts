import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SummonerResponse } from "./model/summoner.model";
import { NGXLogger } from "ngx-logger";
import { environment } from "src/environments/environment";
import { LeagueEntryResponse } from "./model/league-entry.model";
import { ChampionMasteryResponse } from "./model/champion-mastery.model";


@Injectable({ providedIn: 'root' })
export class RiotService {

  summonerSubject = new BehaviorSubject<SummonerResponse>(null);
  summoner$ = this.summonerSubject.asObservable();

  constructor(
    private http: HttpClient,
    private logger: NGXLogger
  ) {}

  getSummoner(region: string, name: string): Observable<SummonerResponse> {
    const endpoint = `/api/${region}/summoner/${encodeURI(name)}`;
    return this.getEndpoint(endpoint);
  }

  updateSummoner(region: string, puuid: string): Observable<SummonerResponse> {
    const endpoint = `/api/${region}/summoner/${encodeURI(puuid)}`;
    const url = new URL(endpoint, environment.apiUrl);
    return this.http.put(url.href, {});
  }

  getNamesStartingWith(region: string, startsWith: string): Observable<string[]> {
    const endpoint = `/api/${region}/summoner-name/starts-with`
    const params = new HttpParams()
      .set('startsWith', startsWith)
      .set('top', 10);
    return this.getEndpoint(endpoint, params);
  }

  getLeagueEntries(region: string, puuid: string): Observable<LeagueEntryResponse[]> {
    const endpoint = `/api/${region}/league-entry/${puuid}`;
    return this.getEndpoint(endpoint);
  }

  getMasteries(region: string, puuid: string): Observable<ChampionMasteryResponse[]> {
    const endpoint = `/api/${region}/champion-mastery/${puuid}`;
    return this.getEndpoint(endpoint);
  }

  private getEndpoint(endpoint: string, params?: HttpParams): Observable<any> {
    // this.logger.debug(endpoint);
    const url = new URL(endpoint, environment.apiUrl);
    params = params ? params : new HttpParams();
    return this.http.get(url.href, { params });
  }

}
