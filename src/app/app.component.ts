import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RiotService } from './shared/riot.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(
    private riot: RiotService
  ) {}

  ngOnInit(): void {
    const storedKey = localStorage.getItem('api_key');
    if(!storedKey) {
      return;
    }
    this.riot.setApiKey(storedKey).subscribe();
  }

}
