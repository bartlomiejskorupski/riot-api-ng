import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http' 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppLoggerModule } from './app-logger.module';
import { SummonerComponent } from './summoner/summoner.component';
import { FindSummonerInputComponent } from './home/find-summoner-input/find-summoner-input.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { MatchHistoryComponent } from './summoner/match-history/match-history.component';
import { ChampionMasteryComponent } from './summoner/champion-mastery/champion-mastery.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    SummonerComponent,
    FindSummonerInputComponent,
    SpinnerComponent,
    MatchHistoryComponent,
    ChampionMasteryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AppLoggerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
