import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NGXLogger } from 'ngx-logger';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {

  showTopSearch = false;

  private sub: Subscription;

  constructor(
    private logger: NGXLogger,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.sub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const urlLen = this.route.root.firstChild.snapshot.url.length;
        this.showTopSearch = !!urlLen;
      }
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

}
