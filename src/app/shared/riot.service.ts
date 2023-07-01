import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SummonerDTO } from "./model/summoner.model";
import { MatchDTO } from "./model/match.model";
import { NGXLogger } from "ngx-logger";


@Injectable({ providedIn: 'root' })
export class RiotService {

  apiKey: string;

  constructor(
    private http: HttpClient,
    private logger: NGXLogger
  ) {}

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
