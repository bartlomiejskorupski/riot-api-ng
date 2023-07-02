import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, map, of, tap } from "rxjs";
import { SummonerDTO } from "./model/summoner.model";
import { MatchDTO } from "./model/match.model";
import { NGXLogger } from "ngx-logger";


@Injectable({ providedIn: 'root' })
export class RiotService {

  private apiKeyValidSubject = new BehaviorSubject<boolean>(false);
  apiKeyValid$ = this.apiKeyValidSubject.asObservable();
  private apiKey: string;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger
  ) {}

  setApiKey(key: string): Observable<boolean> {
    return this.isApiKeyValid(key).pipe(
      tap(valid => {
        this.logger.debug('Api key valid: ', valid);
        this.apiKey = key;
        this.apiKeyValidSubject.next(true);
        localStorage.setItem('api_key', key);
      })
    )
  }

  getApiKey() {
    return this.apiKey;
  }

  isApiKeyValid(key: string): Observable<boolean> {
    const url = '/api/eun1/lol/status/v4/platform-data';
    this.logger.debug('Checking api key:', key);
    return this.http.get(url, {
      params: new HttpParams().set('api_key', key)
    }).pipe(
      map(_ => true),
      catchError(_ => of(false))
    );
  }

  getSummoner(name: string): Observable<SummonerDTO> {
    const endpoint = `/lol/summoner/v4/summoners/by-name/${encodeURI(name)}`;
    return this.getEndpoint(endpoint, 'eun1');
  }

  getMatches(puuid: string): Observable<string[]>{
    const endpoint = `/lol/match/v5/matches/by-puuid/${encodeURI(puuid)}/ids`;
    const params = new HttpParams().set('start', 0).set('count', 5);
    return this.getEndpoint(endpoint, 'europe', params);
  }

  getMatch(matchId: string): Observable<MatchDTO>{
    const endpoint = `/lol/match/v5/matches/${encodeURI(matchId)}`;
    return this.getEndpoint(endpoint, 'europe');
  }

  private getEndpoint(endpoint: string, region: string, params?: HttpParams): Observable<any> {
    const url = `/api/${region}` + endpoint;
    params = params ? params : new HttpParams();
    this.logger.debug(url);
    return this.http.get(url, {
      params: params.set('api_key', this.apiKey)
    });
  }

}
