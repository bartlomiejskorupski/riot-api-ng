import { Component, OnInit } from '@angular/core';
import { RiotService } from '../shared/riot.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private riot: RiotService) { }

  ngOnInit(): void {
    this.riot.apiKey = localStorage.getItem('api_key');
  }

  setApiKey(key: string) {
    this.riot.apiKey = key;
    localStorage.setItem('api_key', key);
  }

  getSummoner(name: string) {
    this.riot.getSummoner(name, 'eun1').subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log('error', error);
      }
    );
  }

}
