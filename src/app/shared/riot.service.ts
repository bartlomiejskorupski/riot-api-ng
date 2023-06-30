import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({ providedIn: 'root' })
export class RiotService {

  apiKey: string;

  private getUrl = (region: string) => `https://${region}.api.riotgames.com`; 

  constructor(private http: HttpClient) {}

  getSummoner(name: string, region: string): Observable<any> {
    const endpoint = `/lol/summoner/v4/summoners/by-name/${encodeURI(name)}`;
    const baseUrl = this.getUrl(region);
    const url = new URL(endpoint, baseUrl);
    return this.http.get(url.href, {
      params: new HttpParams().set('api_key', this.apiKey)
    })
  }


}
