import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { SummonerComponent } from "./summoner/summoner.component";
import { MatchHistoryComponent } from "./summoner/match-history/match-history.component";
import { ChampionMasteryComponent } from "./summoner/champion-mastery/champion-mastery.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'summoner/:region/:name', component: SummonerComponent, children: [
    { path: 'match-history', component: MatchHistoryComponent },
    { path: 'champion-mastery', component: ChampionMasteryComponent }
  ]},
  { path: 'page-not-found', component: PageNotFoundComponent},
  { path: '**', redirectTo: '/page-not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {} 
