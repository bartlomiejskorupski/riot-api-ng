import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  apiKey: string;
  response: string;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.apiKey = localStorage.getItem('APIKey');
  }

  loadApiKey(key: string) {
    this.apiKey = key;
    localStorage.setItem('APIKey', key);
  }

  findSummoner(name: string) {
    this.http
      .get(
        'https://EUN1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + encodeURI(name),
        { params: {
          "api_key": this.apiKey
        }})
      .subscribe(response => {
        this.response = JSON.stringify(response);
      });

  }

}
