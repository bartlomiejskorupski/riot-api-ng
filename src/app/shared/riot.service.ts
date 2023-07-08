import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";
import { SummonerResponse } from "./model/summoner.model";
import { MatchDTO } from "./model/match.model";
import { NGXLogger } from "ngx-logger";
import { environment } from "src/environments/environment";


@Injectable({ providedIn: 'root' })
export class RiotService {

  constructor(
    private http: HttpClient,
    private logger: NGXLogger
  ) {}

  getSummoner(region: string, name: string): Observable<SummonerResponse> {
    const endpoint = `/api/${region}/summoner/${encodeURI(name)}`;
    return this.getEndpoint(endpoint);
  }

  getMatches(puuid: string): Observable<string[]>{
    const endpoint = `/api/matches/by-puuid/${encodeURI(puuid)}`;
    const params = new HttpParams().set('start', 0).set('count', 5);
    return this.getEndpoint(endpoint, params);
  }

  getMatch(matchId: string): Observable<MatchDTO>{
    const endpoint = `/api/match/${encodeURI(matchId)}`;
    return this.getEndpoint(endpoint);
  }

  getNamesStartingWith(region: string, startsWith: string): Observable<string[]> {
    const endpoint = `/api/${region}/summoner-name/starts-with`
    const params = new HttpParams()
      .set('startsWith', startsWith)
      .set('top', 10);
    return this.getEndpoint(endpoint, params);
  }

  private getEndpoint(endpoint: string, params?: HttpParams): Observable<any> {
    this.logger.debug(endpoint);
    const url = new URL(endpoint, environment.apiUrl);
    params = params ? params : new HttpParams();
    return this.http.get(url.href, { params });
  }

}
