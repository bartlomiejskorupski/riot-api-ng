import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SummonerDTO } from "./model/summoner.model";
import { MatchDTO } from "./model/match.model";


@Injectable({ providedIn: 'root' })
export class RiotService {

  apiKey: string;

  private getUrl = (region: string) => `https://${region}.api.riotgames.com`; 

  constructor(private http: HttpClient) {}

  getSummoner(name: string, region: string): Observable<SummonerDTO> {
    const endpoint = `/lol/summoner/v4/summoners/by-name/${encodeURI(name)}`;
    return this.getEndpoint(endpoint, region);
  }

  getMatches(puuid: string): Observable<string[]>{
    const endpoint = `/lol/match/v5/matches/by-puuid/${encodeURI(puuid)}/ids`;
    const params = new HttpParams().set('start', 0).set('count', 5);
    return this.getEndpoint(endpoint, 'europe', params)
  }

  getMatch(matchId: string): Observable<MatchDTO>{
    const endpoint = `/lol/match/v5/matches/${encodeURI(matchId)}`;
    return this.getEndpoint(endpoint, 'europe');
  }

  private getEndpoint(endpoint: string, region, params?: HttpParams): Observable<any> {
    const baseUrl = this.getUrl(region);
    const url = new URL(endpoint, baseUrl);
    params = params ? params : new HttpParams();
    return this.http.get(url.href, {
      params: params.set('api_key', this.apiKey)
    });
  }

}
