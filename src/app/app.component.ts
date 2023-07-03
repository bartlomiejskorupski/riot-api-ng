import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RiotService } from './shared/riot.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  
  private sub: Subscription;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private route: ActivatedRoute,
    private riot: RiotService,
  ) {}

  ngOnInit(): void {
    const storedKey = localStorage.getItem('api_key');
    if(!storedKey) {
      return;
    }
    this.sub = this.riot.setApiKey(storedKey).subscribe({
      next: valid => {
        if(!valid){
          this.logger.debug('Api key invalid, routing to home')
          this.router.navigate(['/']);
        }
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
